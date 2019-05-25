const fs = require('fs');
const bartQuotes = require('../assets/bartQuotes');
const getMemoryUsed = require('../utils/getMemoryUsed');
const http = require('http');
const { Transform } = require('stream');



let server;
server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.url === '/favicon.ico') {
    res.writeHead(404);
    res.end();
    return;
  }

  if (req.url === '/stop') {
    res.end(getMemoryUsed());
    console.log('closing the server...');
    server.close(() => {
      console.log('Terminating the app.');
      process.exit(0);
    });
  }

  const bartTransform = new Transform({
    transform(chunk, encoding, callback) {
      // convert chunk to string
      const chunkStr = chunk.toString();

      // split into lines
      const lines = chunkStr.split('\n').filter(line => !!line);

      // insert bart quote every two lines
      const bartLines = lines.map((line, i) => {
        let bartLine;
        if (i%3===0 && i!==0) {
          bartLine = line + `\n${bartQuotes[Math.floor(Math.floor(Math.random() * bartQuotes.length))]}`;
          return bartLine;
        }
        return line;
      });

      // convert lines into string and push into callback as buffer
      callback(null, Buffer.from(bartLines.join('\n')));
    }
  });

  const readStream = fs.createReadStream('assets/romeoAndJuliet.txt');
  readStream
    .pipe(bartTransform)
    .pipe(res);

});

server.listen(3000, 'localhost', () => {
  console.log(`Server running at localhost:3000/`);
});

process.on('exit', () => console.log(getMemoryUsed()));


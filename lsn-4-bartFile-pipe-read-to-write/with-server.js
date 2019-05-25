const fs = require('fs');
const bartQuotes = require('../assets/bartQuotes');
const getMemoryUsed = require('../utils/getMemoryUsed');
const { Readable } = require('stream');
const http = require('http');

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
    return;
  }

  let numberOfLines = parseFloat(req.url.split('/')[1]);
  numberOfLines = Number.isNaN(numberOfLines) ? 100 : numberOfLines;

  console.log(`Creating the bart write stream with ${numberOfLines} lines`);
  let index = numberOfLines;
  // Creating the quotes as a Read stream
  const bartReadable = new Readable({
    read() {
      const i = index--;
      if (i < 0) {
        // pushing null will terminate the stream
        console.log('No more bart wisdom to push into the read stream');
        this.push(null);
      } else {
        this.push(`${bartQuotes[Math.floor(Math.floor(Math.random() * bartQuotes.length))]}\n`);
      }
    },
  });
  bartReadable.pipe(res);
});

server.listen(3000, 'localhost', () => {
  console.log(`Server running at localhost:3000/`);
});

process.on('exit', () => console.log(getMemoryUsed()));


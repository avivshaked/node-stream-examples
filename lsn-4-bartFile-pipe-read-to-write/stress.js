const http = require('http');

function makeCalls () {
  http.get('http://127.0.0.1:3000/1000', (res) => {
    res.on('end', () => {
      console.log('Res ended');
    });
    res.on('data', (n => n));
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
}

setInterval(makeCalls, 100);

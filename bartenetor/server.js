const express = require('express');
var childProc = require('child_process');

const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.on('finish', () => {
    console.log('Request url: ', req.url);
  });
  next();
});
app.use(express.static('.'));

app.listen(port, () => {
    console.log(`listening on port ${port}!`);
    childProc.exec('open -a "Google Chrome" http://localhost:5000', (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
);

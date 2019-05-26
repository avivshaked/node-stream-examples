// var childProc = require('child_process');
import React from "react";
import ReactDOMServer from "react-dom/server"
import express from "express";

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.on('finish', () => {
    console.log('Request url: ', req.url);
  });
  next();
});
app.use(express.static('/Users/aviv.shaked/Projects/myProjects/node-streams-examples/lsn-6-ssr/dist'));

app.get('/', (req, res) => {
  const reactstr = ReactDOMServer.renderToString(<div>Hello React!</div>);

  const page = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>React and Webpack4</title>
    </head>
    <body>
    <section id="index">
        ${reactstr}
    </section>
    <script src="index.js"></script>
    </body>
    </html>
  `;
  res.send(page);
});

app.listen(port, () => {
    console.log(`listening on port ${port}!`);
    // childProc.exec('open -a "Google Chrome" http://localhost:5000', (err) => {
    //   if (err) {
    //     console.log(err);
    //   }
    // });
  }
);

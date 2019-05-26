// var childProc = require('child_process');
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import App from '../components/App.jsx';

var compression = require('compression');

const app = express();
const port = 3000;

const getPage = (Component, props = {}) => {

  /** This is pretty straight forward. We generate a string synchronously
      If we need to wait for initial data, or the react render is complicated
      the response will hang, and a white page will be shown to the user **/
  const reactstr = ReactDOMServer.renderToString(<Component {...props} />);

  /** We return the html markup we want, and inject React with this:
      <section id="index">${reactstr}</section> **/
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>React and Webpack4</title>
        <style>
          body {
            margin: 0;
            padding: 0;
          }           
        </style>
    </head>
    <body>
    <section id="index">${reactstr}</section>
    <script>
        window.__DATA__ = {
          props: ${JSON.stringify(props)}
        };
    </script>
    <script src="index.js"></script>
    </body>
    </html>
  `;
};

const pipeResponseWithStream = (res, next, Component, props = {}) => {

  /** We write to the stream the initial payload with res.write**/
  res.write(`
      <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>React and Webpack4</title>
        <style>
          body {
            margin: 0;
            padding: 0;
          }           
        </style>
    </head>
    <body>
    <!-- This part will be generated only if timeout was requested. 
    We can use this approach every time we know it might take some time to get the initial data and start the render -->
    ${props.streamTimout ? `
      <h2 class="remove-on-init">You can send some initial markup before react renders</h2>
      <h2 class="remove-on-init">Maybe a spinner? Or a skeleton?</h2>
    ` : ''}
  `);

  /** The Timeout is here to illustrate the asynchronous possibilities of working with stream **/
  setTimeout(() => {

    /** We remove the elements in the initial markup that we don't want, and open the element that will hold the react markup **/
    res.write('<style>.remove-on-init{display: none;}</style><section id="index">');

    /** We open the react Read Stream **/
    const reactStream = ReactDOMServer.renderToNodeStream(<Component {...props} />);
    /** We pipe the React Stream into the Response Stream **/
    reactStream.pipe(res, { end: false }); // Important to add the pipe option 'end: false' so the
                                           // response doesn't terminate when react stream ends.

    /** When the React Stream is done, we ship the rest of the markup **/
    reactStream.on('end', () => {
      res.end(`
    </section>
    <script>
        window.__DATA__ = {
          props: ${JSON.stringify(props)}
        };
    </script>
    <script src="index.js"></script>
    </body>
    </html>
    `);
    });
  }, props.streamTimout || 0);

};

app.use(compression());
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log('Request url: ', req.url);
  });
  next();
});

app.use(express.static('./lsn-6-ssr/dist'));

app.get('/', (req, res) => {
  res.send(getPage(App, { title: 'React SSR without streams' }));
});

app.get('/stream', (req, res, next) => {
  pipeResponseWithStream(res, next, App, { title: 'React SSR with streams' });
});

app.get('/stream-delay/:timeout', (req, res, next) => {
  console.log(req.params.timeout);
  pipeResponseWithStream(res, next, App,
    { title: 'React SSR stream with delay', streamTimout: parseInt(req.params.timeout) || 0 });
});

app.listen(port, () => {
    console.log(`listening on port ${port}!`);
  },
);

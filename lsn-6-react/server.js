// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version
// you are running See https://github.com/zeit/next.js/issues/1245 for discussions on Universal
// Webpack or universal Babel
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
// const WithStreams = require('./pages/with-streams').default;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/') {
      app.render(req, res, '/', query);
      // } else if (pathname === '/with-streams') {
      //   response.write('<html><head><title>Page</title></head><body><div id="root">');
      //
      //   // Render your frontend to a stream and pipe it to the response
      //   const stream = renderToNodeStream(React.createElement(WithStreams));
      //   stream.pipe(response, { end: 'false' });
      //
      //   // When React finishes rendering send the rest of your HTML to the browser
      //   stream.on('end', () => {
      //     response.end('</div></body></html>');
      //   });
      // } else {
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, err => {
    if (err) {
      throw err;
    }
    console.log('> Ready on http://localhost:3000');
  });
});

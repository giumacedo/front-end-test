/* eslint no-console:0 */

require('babel-register');

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactRouter = require('react-router-dom');
const cors = require('cors');
const _ = require('lodash');
const fs = require('fs');
const compression = require('compression');
const App = require('./src/js/App').default;

const StaticRouter = ReactRouter.StaticRouter;
const port = 8080;
const baseTemplate = fs.readFileSync('./index.html');
const template = _.template(baseTemplate);

const server = express();
server.use(cors());

server.use(compression());
server.use('/public', express.static('./public'));

const searchRoute = require('./src/api/routes/searchRoute');
const itemDetail = require('./src/api/routes/itemDetailRoute');

searchRoute(server);
itemDetail(server);

server.use((req, res) => {
  const context = {};
  const body = ReactDOMServer.renderToString(
    React.createElement(StaticRouter, { location: req.url, context },
      React.createElement(App)
    )
  );

  if (context.url) {
    res.redirect(context.url);
  }

  res.write(template({ body }));
  res.end();
});


server.listen(port);

console.log(`server started on: ${port}`);

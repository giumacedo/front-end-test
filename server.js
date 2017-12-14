
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const searchRoute = require('./api/routes/searchRoute');
const itemDetail = require("./api/routes/itemDetailRoute");
searchRoute(app);
itemDetail(app);

app.listen(port);

console.log('server started on: ' + port);

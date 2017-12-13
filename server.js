
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const search = require('./api/routes/searchRoute');
search(app); //register the route

app.listen(port);

console.log('server started on: ' + port);

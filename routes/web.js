const express = require('express');
const route = express.Router();

route.use((req, res, next) => {
  console.log('this is the middleware of Web route');

  next();
})

route.get('/', (req, res) => {
  res.send('/ being hit');
})

route.get('/create', (req, res) => {
  res.send('/ being hitk');
})

module.exports = route;
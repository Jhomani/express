const express = require('express');
const app = express();
const path = require('path');
const Joi = require('joi');

const bodyParser = require('body-parser');
const { schedulingPolicy } = require('cluster');
const { response } = require('express');

const web = require('./routes/web');
app.use('/web', web);

app.use('/public', express.static(path.join(__dirname, 'static')));

// midleware
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(bodyParser.json());


// only excecute in the route example
app.use('/example', (req, res, next) => {
  console.log(req.url, req.method)
  req.banana = 'banana'
  next()
})

app.set('view engine', 'ejs');

app.get('/example', (req, res) => {

  console.log(req.banana);

  res.send('Middlewate');
})

app.get('/user/:userQuery', (req, res) => {
  res.render('index', { data: { 
     userQuery: req.params.userQuery,
     array: ['data1', 'data2', 'data3', 'data5'],
     loggedIn: false
   }});
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
})

app.post('/', (req, res) => {
  console.log(req.body);

  const schema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(5).max(10).required()
  });

  const { error, value} = schema.validate(req.body);
  
  if(error) {
    return res.json({ error: error.details[0].message }, 422)
  } else {
    return res.json({ success: true })
  }
});

app.get('/image/:name', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/image', req.params.name));
});

app.get('/user/:name/:age', (req, res) => {
  console.log(req.query);
  res.send('you are beautiful ' + req.params.name);
})

app.listen(3000);

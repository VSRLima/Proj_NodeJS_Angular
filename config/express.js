const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const consign = require('consign');

module.exports = () => {
  const app = express();

  app.set('port', process.env.PORT || config.get('server.port'));

  app.use(function (req, res, next) {

    bodyParser.json()

    res.setHeader('Access-Control-Allow-Origin', '*');
  
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD, OPTIONS');
  
    res.setHeader('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    next();
  });
  

  consign({cwd: 'api'})
    .then('data')
    .then('controllers')
    .then('routes')
    .into(app);

  return app;
};
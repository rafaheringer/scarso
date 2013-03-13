'use strict';

//Carrega dependências
var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    requirejs = require('requirejs');

//Instancia o aplicativo
var app = express();

//Seta as configurações
app.configure(function(){
  app.set('port', process.env.PORT || 8888);                //Porta utilizada
  app.set('views', __dirname + '/views');                   //Local onde as views se encontram
  app.set('view engine', 'html');
  app.engine('html', require('ejs').renderFile);            //Usa EJS com extensão .html
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));  //Pastas de acesso público
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.use(express.static(path.join(__dirname, '_devtests')));
});

app.get('/', routes.index);
app.get('/users', user.list);

//Usando o Require.JS
requirejs.config({
    nodeRequire: require
});
//requirejs(['foo', 'bar'],
//function   (foo,   bar) {
    //foo and bar are loaded according to requirejs
    //config, but if not found, then node's require
    //is used to load the module.
//});

//Inicia servidor HTTP
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
  console.log('Environment: ' + app.settings.env);
});

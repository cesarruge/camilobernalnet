/* Mongodb cnn:
 * user: camilobernalnet
 * pass: Knowledge2010$
 *  mongodb://<dbuser>:<dbpassword>@ds025449.mlab.com:25449/camilobernalnet
 */

/*
var http = require("http");
var server = http.createServer();

var control = function(request, response){
   response.writeHead(200, {'content-type':'text/plain'});
   response.write("Hola, mundo!.");
   response.end();    
};

server.on('request', control);
server.listen(process.env.PORT || 5000);*/

// Inicialización
var http = require('http');
var express  = require('express');
var path = require('path');

var mongoose = require('mongoose'); 				// mongoose para mongodb
var port  	 = process.env.PORT || 8080; 			// Cogemos el puerto 8080

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');

var app = express();

// Configuracion
mongoose.connect('mongodb://localhost:27017/MeanExample'); 	// Hacemos la conexión a la base de datos de Mongo con nombre "MeanExample"

app.set('port', port);

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
                  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

require('./app/routes.js')(app);



// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}


var server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});                  




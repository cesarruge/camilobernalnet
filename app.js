var http = require("http");
var server = http.createServer();

var control = function(request, response){
   response.writeHead(200, {'content-type':'text/plain'});
   response.write("Hola, mundo!.");
   response.end();    
};

server.on('request', control);
server.listen(process.env.PORT || 5000);
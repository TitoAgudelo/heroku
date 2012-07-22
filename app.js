
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http');

var app = express();
var server = http.createServer(app);

app.configure(function(){
  //app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  //app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


//http.createServer(app).listen(app.get('port'), function(){
//  console.log("Express server listening on port " + app.get('port'));
//});


var io = require('socket.io').listen(server);

// assuming io is the Socket.IO server object
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.sockets.on('connection', function (socket) {
  //socket.emit('news', { hello: 'world' });
  socket.on('senddata', function (data) {
    console.log(data);
    io.sockets.emit('getdata', data);
  });
});


app.get('/', routes.index);

server.listen(process.env.PORT || 3000);
//console.log("Nodejs blackboard listening on port %d in %s mode", app.address().port, app.settings.env);


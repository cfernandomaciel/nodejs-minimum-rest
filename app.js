/*jshint node:true*/
'use strict';

var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var multer          = require('multer');
var errorHandler    = require('errorhandler');
var methodOverride  = require('method-override');
var logger          = require('morgan');

var config      = require('./config');
var accessors   = require('./routes/accessors');
var users       = require('./routes/users');
var Factory     = require('./routes/db/factory');


var port        = process.env.PORT || config.port;
var environment = process.env.NODE_ENV;

app.use(logger('dev'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
// parse multipart/form-data
app.use(multer());
app.use(logger('dev'));
app.use(methodOverride());

var db = Object.assign({}, Factory())
db.getInstance().initialize(config.mongo.host, config.mongo.dbName);

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');


    next();
}

app.use(allowCrossDomain);
app.set('port', port);    
app.set('socket-port', config.socket.port);
app.options('*' , function(req,res) {res.send({});})

var server = require('http').createServer(app);
var io = require('socket.io')(server)

// Send current time to all connected clients
function sendTime() {
    io.emit('time', { time: new Date().toJSON() });
}

// Send current time every 10 secs
setInterval(sendTime, 10000);

io.on('connection', function(socket){

    socket.emit('welcome', { success: true, message: 'socket connected', id : socket.id })

    socket.on('send', function(data) {
        console.log('emmitting socket.io...', data);
        socket.emit('socket message: ', data);
    });

    socket.on('event', function(data){
        console.log('socket event...');
        socket.emit('socket event: ', data);
    });

    socket.on('disconnect', function(){
        console.log('disconnecting from socket...');
    });

});

server.listen(app.get('socket-port'));


//just a message for lost developers
app.get('/', function(req, res) {
    res.send('Hello!, The API is at ' + config.host + ':' + config.port + config.api);
});

//setting my supersecret key here
app.set('superSecret', config.secret);

//the authenticate method. It's a root one (valid for any route), that's why here.
app.post(config.api + 'authenticate', function(req, res) {
    users.authenticate(req, res, app.get('superSecret'));
})

app.use(function(req, res, next) {
    users.checkSession(req, res, next, app.get('superSecret'));
});

//users related routes
app.get(config.api + 'users', accessors.getUsers);
app.get(config.api + 'users/:id', accessors.getUser);
app.get(config.api + 'roles', accessors.getRoles);
app.get(config.api + 'roles/:id', accessors.getRole);
app.get(config.api + 'permissions', accessors.getPermissions);


app.listen(port, function() {
  console.log('Express server listening on port ' + port + ' of api: ', config.api);    
});

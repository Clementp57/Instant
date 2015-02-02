/// <reference path="definitions/express/express.d.ts" />
/// <reference path='definitions/node/node.d.ts' />
/// <reference path='definitions/express/express-middleware.d.ts' />
/// <reference path="definitions/socket.io/socket.io.d.ts" />
/// <reference path="src/model.ts" />
var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var errorHandler = require("errorhandler");
var io = require("socket.io");
var app = express();
// Configuration
app.set('views', __dirname);
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", express.static(__dirname));
var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    app.set('port', '1337');
    app.use(errorHandler({ dumpExceptions: true, showStack: true }));
}
else if (env === 'production') {
    app.set('port', '3000    ');
    app.use(errorHandler());
}
// ROUTING
// ===========================
app.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});
// CREATE SERVER & LISTEN
// ===========================
var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log("Server listening on port [" + app.get('port') + ']');
});
var ioServer = io.listen(server);
var users = {};
var messages = [];
var MAX_MESSAGES_BUFFER = 15;
//Connexion socket
ioServer.sockets.on('connection', function (socket) {
    //Web socket établie
    var timeStamp = new Date().getTime();
    console.log('[CONNEXION] ' + timeStamp + ' | client IP ' + socket.request.connection.remoteAddress + ' |');
    var me = {};
    for (var k in users) {
        socket.emit('newuser', users[k]);
    }
    socket.on('login:attempt', function (user) {
        me.name = user.name;
        me.ip = socket.request.connection.remoteAddress;
        me.id = guid();
        users[me.id] = me;
        ioServer.sockets.emit('newuser', me);
        socket.emit('login:success', me);
    });
    socket.on('request:loggedUser', function () {
        socket.emit('response:loggedUser', me);
    });
    socket.on('request:lastMessages', function () {
        console.info('Requesting last messages... Sending');
        socket.emit('response:lastMessages', messages);
    });
    socket.on('disconnect', function (user) {
        if (!me) {
            return false;
        }
        delete users[me.id];
        console.info('disconnection');
        ioServer.sockets.emit('userdisconnect', user);
    });
    socket.on('newmsg', function (message) {
        message.user = me;
        message.id = guid();
        messages.push(message);
        if (messages.length > MAX_MESSAGES_BUFFER) {
            messages.shift();
        }
        ioServer.sockets.emit('newmsg', message);
    });
});
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
;

/// <reference path="../app.ts" />
/// <reference path="../services.ts" />
/// <reference path="../model.ts" />
'use strict';
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var LoginController = (function () {
            function LoginController($scope, ngSocket) {
                this.$scope = $scope;
                this.ngSocket = ngSocket;
                this.socket = ngSocket;
                this.init();
            }
            LoginController.prototype.init = function () {
                var _this = this;
                $('#loginForm').submit(function (event) {
                    _this.logUser(event);
                });
                $('#msgForm').submit(function (event) {
                    _this.sendMsg(event);
                });
                this.socket.on('newmsg', function (message) {
                    _this.outputMessage(message);
                });
                this.socket.on('newuser', function (user) {
                    _this.addUser(user);
                });
                this.socket.on('login:success', function (user) {
                    _this.welcomeUser(user);
                });
                this.socket.on('login:error', function () {
                    _this.refuseLogin();
                });
            };
            LoginController.prototype.logUser = function (event) {
                event.preventDefault();
                this.socket.emit('login:attempt', {
                    username: $('#username').val(),
                    password: $('#password').val()
                });
            };
            LoginController.prototype.sendMsg = function (event) {
                event.preventDefault();
                this.socket.emit('newmsg', {
                    message: $('#newMsg').val()
                });
                $('#newMsg').val('').focus();
            };
            LoginController.prototype.outputMessage = function (message) {
                $('#messages').append('<div class="message">' + message.user.name + ' : ' + message.message + '</div>');
            };
            LoginController.prototype.addUser = function (user) {
                $('#users').append('<div class="user" id="' + user.id + '">' + user.name + '"</div>');
            };
            LoginController.prototype.removeUser = function (user) {
                $('#' + user.id).remove();
            };
            LoginController.prototype.welcomeUser = function (user) {
                this.user = user;
            };
            LoginController.prototype.refuseLogin = function () {
            };
            return LoginController;
        })();
        controllers.LoginController = LoginController;
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
// Remember to pass all the services used by the constructor of the Controller.
app.registerController('LoginController', ['$scope', 'socket']);

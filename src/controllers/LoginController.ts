/// <reference path="../app.ts" />
/// <reference path="../services.ts" />
/// <reference path="../model.ts" />

'use strict';

module app.controllers {

    export class LoginController implements IController {
        private socket: any;
        private locationService: ng.ILocationService;

        constructor (private $scope: any, private ngSocket, private $location: ng.ILocationService) {
            this.socket = ngSocket;
            this.locationService = $location;
            this.init();
        }

        private init() : void {
            $('#loginForm').submit((event) => { this.attemptLogin(event); });
            $('#msgForm').submit((event) => { this.sendMsg(event); });

            this.socket.on('newmsg', (message) => { this.outputMessage(message); });
            this.socket.on('newuser', (user) => { this.addUser(user) });
            this.socket.on('login:success', (user) => { this.welcomeUser(user) });
            this.socket.on('login:error', () => { this.refuseLogin() });

            $('#username').focus();
        }

        private attemptLogin(event: JQueryEventObject) : void {
            event.preventDefault();
            this.socket.emit('login:attempt', {
                name: $('#username').val(),
                password: $('#password').val()
            });
        }

        private sendMsg(event: JQueryEventObject) : void {
            event.preventDefault();
            this.socket.emit('newmsg', {
                message: $('#newMsg').val()
            });
            $('#newMsg').val('').focus();
        }

        private outputMessage(message: Model.Message) : void {
            $('#messages').append('<div class="message">'+ message.user.name+ ' : ' + message.message + '</div>');
        }

        private addUser(user: Model.User) : void {
            $('#users').append('<div class="user" id="' + user.id + '">'+user.name+'"</div>');
        }

        private removeUser(user: Model.User) : void {
            $('#' + user.id).remove();
        }

        private welcomeUser(user: Model.User) : void {
            this.locationService.path('chatroom');
        }

        private refuseLogin(): void {
                
        }

    }

}

// Remember to pass all the services used by the constructor of the Controller.
app.registerController('LoginController', ['$scope','socket','$location']);

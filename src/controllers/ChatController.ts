/// <reference path="../app.ts" />
/// <reference path="../services.ts" />
/// <reference path="../model.ts" />

'use strict';

module app.controllers {

    export class ChatController implements IController {
        private socket: any;
        public user: Model.User;

        constructor (private $scope: any, private ngSocket) {
            this.socket = ngSocket;
            this.init();
        }

        private init() : void {
            $('#loginForm').submit((event) => { this.logUser(event); });
            $('#msgForm').submit((event) => { this.sendMsg(event); });

            this.socket.on('newmsg', (message) => { this.outputMessage(message); });
            this.socket.on('newuser', (user) => { this.addUser(user) });
            this.socket.on('login:success', (user) => { this.welcomeUser(user) });
            this.socket.on('login:error', () => { this.refuseLogin() });
        }

        private logUser(event: JQueryEventObject) : void {
            event.preventDefault();
            this.socket.emit('login:attempt', {
                username: $('#username').val(),
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

        private welcomeUser(user: Model.User, $location: any) : void {
            $location.path('chatroom');
        }

        private refuseLogin(): void {

        }

    }

}

// Remember to pass all the services used by the constructor of the Controller.
app.registerController('ChatController', ['$scope','socket']);

/// <reference path="../app.ts" />
/// <reference path="../services.ts" />
/// <reference path="../model.ts" />

'use strict';

module app.controllers {

    export class ChatController implements IController {
        private socket: any;
        public user: Model.User;
        public messages: Model.Message[] = [];

        constructor (private $scope: any, private ngSocket) {
            this.socket = ngSocket;
            this.init();

            this.socket.emit('request:loggedUser');
            this.socket.emit('request:lastMessages');
        }

        private init() : void {
            this.$scope.$watch(this.messages, (oldVal, newVal) => {
                console.log('messages changed!');
            });
            $('#msgForm').submit((event) => { this.sendMsg(event); });

            this.socket.on('newmsg', (message) => { this.readMessage(message); });
            this.socket.on('newuser', (user) => { this.addUser(user) });
            this.socket.on('response:loggedUser', (user) => { this.initUser(user) });
            this.socket.on('response:lastMessages', (messages) => { this.initMessages(messages) });

            $('#newMsg').focus();

        }

        private initUser(user : Model.User): void {
            this.user = new Model.User(user.name, user.ip, user.id);

            if(!localStorage.getItem("IM_USER")) {
                localStorage.setItem("IM_USER", JSON.stringify(this.user));
            }
        }

        private initMessages(messages: any[]): void {
            console.log('last Messages',messages);
            messages.forEach((message) => {
                this.messages.push(new Model.Message(message.user, message.message));
            });
        }

        private sendMsg(event: JQueryEventObject) : void {
            event.preventDefault();
            this.socket.emit('newmsg', {
                message: $('#newMsg').val()
            });
            $('#newMsg').val('').focus();
        }

        private readMessage(message: any) : void {
            this.messages.push(new Model.Message(message.user, message.message));
            $("#messageList").scrollTop($("#messageList")[0].scrollHeight);
        }

        private addUser(user: Model.User) : void {
            $('#users').append('<div class="user" id="' + user.id + '">'+user.name+'"</div>');
        }

        private removeUser(user: Model.User) : void {
            $('#' + user.id).remove();
        }

    }

}

// Remember to pass all the services used by the constructor of the Controller.
app.registerController('ChatController', ['$scope','socket']);

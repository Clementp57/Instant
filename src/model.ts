'use strict';

module Model {
    export class User {
        public constructor(name: string, ip: string, id: string) {
            this.name = name;
            this.ip = ip;
            this.id = id;
        }

        public name: string;
        public ip: string;
        public id: string;
    }

    export class Message {
        public user: User;
        public message: string;

        public constructor(user: Model.User, message: string) {
            this.user = user;
            this.message = message;
        }

    }
}

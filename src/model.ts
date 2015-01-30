'use strict';

module Model {
    export class User {
        public name: string;
        public ip: string;
        public id: string;
    }

    export class Message {
        public user: User;
        public message: string;
    }
}

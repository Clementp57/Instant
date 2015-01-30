/// <reference path="app.ts" />


'use strict';

module app.services {

    export class InstantSocketService implements IService {
        private socket : any;
        static $inject = ['socket'];

        constructor (socket: any ) {
            console.info(socket);
            this.socket = socket;
        }

        public getSocket() : any {
            return this.socket;
        }

    }

}

app.registerService('InstantSocketService', ['socket']);

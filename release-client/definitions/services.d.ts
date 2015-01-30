/// <reference path="app.d.ts" />
declare module app.services {
    class InstantSocketService implements IService {
        private socket;
        static $inject: string[];
        constructor(socket: any);
        getSocket(): any;
    }
}

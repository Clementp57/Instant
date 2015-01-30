/// <reference path="app.ts" />
'use strict';
var app;
(function (app) {
    var services;
    (function (services) {
        var InstantSocketService = (function () {
            function InstantSocketService(socket) {
                console.info(socket);
                this.socket = socket;
            }
            InstantSocketService.prototype.getSocket = function () {
                return this.socket;
            };
            InstantSocketService.$inject = ['socket'];
            return InstantSocketService;
        })();
        services.InstantSocketService = InstantSocketService;
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
app.registerService('InstantSocketService', ['socket']);

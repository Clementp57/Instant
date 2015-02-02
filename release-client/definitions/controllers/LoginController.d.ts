/// <reference path="../app.d.ts" />
/// <reference path="../services.d.ts" />
/// <reference path="../model.d.ts" />
declare module app.controllers {
    class LoginController implements IController {
        private $scope;
        private ngSocket;
        private $location;
        private socket;
        private locationService;
        constructor($scope: any, ngSocket: any, $location: ng.ILocationService);
        private init();
        private attemptLogin(event);
        private sendMsg(event);
        private outputMessage(message);
        private addUser(user);
        private removeUser(user);
        private welcomeUser(user);
        private refuseLogin();
    }
}

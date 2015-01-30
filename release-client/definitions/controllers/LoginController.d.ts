/// <reference path="../app.d.ts" />
/// <reference path="../services.d.ts" />
/// <reference path="../model.d.ts" />
declare module app.controllers {
    class LoginController implements IController {
        private $scope;
        private ngSocket;
        private socket;
        user: Model.User;
        constructor($scope: any, ngSocket: any);
        private init();
        private logUser(event);
        private sendMsg(event);
        private outputMessage(message);
        private addUser(user);
        private removeUser(user);
        private welcomeUser(user);
        private refuseLogin();
    }
}

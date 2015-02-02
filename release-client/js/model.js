'use strict';
var Model;
(function (Model) {
    var User = (function () {
        function User(name, ip, id) {
            this.name = name;
            this.ip = ip;
            this.id = id;
        }
        return User;
    })();
    Model.User = User;
    var Message = (function () {
        function Message(user, message) {
            this.user = user;
            this.message = message;
        }
        return Message;
    })();
    Model.Message = Message;
})(Model || (Model = {}));

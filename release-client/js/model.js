'use strict';
var Model;
(function (Model) {
    var User = (function () {
        function User() {
        }
        return User;
    })();
    Model.User = User;
    var Message = (function () {
        function Message() {
        }
        return Message;
    })();
    Model.Message = Message;
})(Model || (Model = {}));

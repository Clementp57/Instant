/// <reference path="app.ts" />
'use strict';
var app;
(function (app) {
    var directives;
    (function (directives) {
        var MyDirective = (function () {
            function MyDirective() {
                this.template = '<div></div>';
                this.restrict = 'E';
                this.link = function ($scope, element, attrs) {
                    element.text('this is the MyDirective directive');
                };
            }
            return MyDirective;
        })();
        directives.MyDirective = MyDirective;
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
app.registerDirective('MyDirective', []);

/// <reference path="app.ts" />
'use strict';
var app;
(function (app) {
    var filters;
    (function (filters) {
        var RangeTo = (function () {
            function RangeTo() {
            }
            RangeTo.prototype.filter = function (start, end) {
                var out = [];
                for (var i = start; i < end; ++i)
                    out.push(i);
                return out;
            };
            return RangeTo;
        })();
        filters.RangeTo = RangeTo;
        var Splice = (function () {
            function Splice() {
            }
            Splice.prototype.filter = function (input, start, howMany) {
                return input.splice(start, howMany);
            };
            return Splice;
        })();
        filters.Splice = Splice;
    })(filters = app.filters || (app.filters = {}));
})(app || (app = {}));
app.registerFilter('RangeTo', []);
app.registerFilter('Splice', []);

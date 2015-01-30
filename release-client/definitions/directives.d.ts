/// <reference path="app.d.ts" />
declare module app.directives {
    class MyDirective implements IDirective {
        template: string;
        restrict: string;
        link: ($scope: any, element: JQuery, attrs: ng.IAttributes) => void;
    }
}

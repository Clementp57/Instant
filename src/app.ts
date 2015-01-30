/// <reference path="./../definitions/jquery/jquery.d.ts" />
/// <reference path="./../definitions/angular/angular.d.ts" />
/// <reference path="./../definitions/angular/angular-route.d.ts" />
/// <reference path="./../definitions/angular/angular-resource.d.ts" />

'use strict';

declare var io;

// Create and register modules
var modules = ['app.controllers','app.directives', 'app.filters', 'app.services', 'Model'];
modules.forEach((module) => angular.module(module, []));
modules.push('ngRoute');
modules.push('ngAnimate');
modules.push('ngMaterial');
modules.push('socket-io');

// 3rd party dependencies
//modules.push('btford.socket-io');

angular.module('app', modules);

// ROUTING
angular.module('app').config(['$routeProvider',
    function routes($routeProvider: ng.route.IRouteProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../views/login.html',
                controller: 'app.controllers.LoginController as ctrl'
            })
            .when('/chatroom', {
                templateUrl: '../views/chatroom.html',
                controller: 'app.controllers.ChatController as ctrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);

module app {
    export module controllers {}
    export module directives {}
    export module filters {}
    export module services {}

    export interface IController {}
    export interface IDirective {
        restrict: string;
        link($scope: ng.IScope, element: JQuery, attrs: ng.IAttributes): any;
    }
    export interface IFilter {
        filter (input: any, ...args: any[]): any;
    }
    export interface IService {}

    /**
     * Register new controller.
     *
     * @param className
     * @param services
     */
    export function registerController (className: string, services = []) {
        var controller = 'app.controllers.' + className;
        services.push(app.controllers[className]);
        angular.module('app.controllers').controller(controller, services);
    }

    /**
     * Register new filter.
     *
     * @param className
     * @param services
     */
    export function registerFilter (className: string, services = []) {
        var filter = className.toLowerCase();
        services.push(() => (new app.filters[className]()).filter);
        angular.module('app.filters').filter(filter, services);
    }

    /**
     * Register new directive.
     *
     * @param className
     * @param services
     */
    export function registerDirective (className: string, services = []) {
        var directive = className[0].toLowerCase() + className.slice(1);
        services.push(() => new app.directives[className]());
        angular.module('app.directives').directive(directive, services);
    }

    /**
     * Register new service.
     *
     * @param className
     * @param services
     */
    export function registerService (className: string, services  = []) {
        var service = className[0].toLowerCase() + className.slice(1);
        services.push(() => new app.services[className]());
        angular.module('app.services').factory(service, services);
    }
}

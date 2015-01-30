/// <reference path="../definitions/jquery/jquery.d.ts" />
/// <reference path="../definitions/angular/angular.d.ts" />
/// <reference path="../definitions/angular/angular-route.d.ts" />
/// <reference path="../definitions/angular/angular-resource.d.ts" />
declare var io: any;
declare var modules: string[];
declare module app {
    module controllers {
    }
    module directives {
    }
    module filters {
    }
    module services {
    }
    interface IController {
    }
    interface IDirective {
        restrict: string;
        link($scope: ng.IScope, element: JQuery, attrs: ng.IAttributes): any;
    }
    interface IFilter {
        filter(input: any, ...args: any[]): any;
    }
    interface IService {
    }
    /**
     * Register new controller.
     *
     * @param className
     * @param services
     */
    function registerController(className: string, services?: any[]): void;
    /**
     * Register new filter.
     *
     * @param className
     * @param services
     */
    function registerFilter(className: string, services?: any[]): void;
    /**
     * Register new directive.
     *
     * @param className
     * @param services
     */
    function registerDirective(className: string, services?: any[]): void;
    /**
     * Register new service.
     *
     * @param className
     * @param services
     */
    function registerService(className: string, services?: any[]): void;
}

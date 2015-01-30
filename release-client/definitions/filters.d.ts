/// <reference path="app.d.ts" />
declare module app.filters {
    class RangeTo implements IFilter {
        filter(start: number, end: number): any[];
    }
    class Splice implements IFilter {
        filter(input: Array<any>, start: number, howMany: number): any[];
    }
}

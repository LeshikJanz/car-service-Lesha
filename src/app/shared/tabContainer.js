"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var tab_1 = require('./tab');
var TabsContainer = (function () {
    function TabsContainer() {
        this.selectedChange = new core_1.EventEmitter();
    }
    TabsContainer.prototype.ngAfterContentInit = function () {
        this.activate(this.tabs.first);
    };
    TabsContainer.prototype.activate = function (tab) {
        this.tabs.toArray().forEach(function (tab) { return tab.active = false; });
        tab.active = true;
        this.selectedChange.emit(tab.title);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TabsContainer.prototype, "selectedChange", void 0);
    __decorate([
        core_1.ContentChildren(tab_1.Tab), 
        __metadata('design:type', core_1.QueryList)
    ], TabsContainer.prototype, "tabs", void 0);
    TabsContainer = __decorate([
        core_1.Component({
            selector: 'tabsContainer',
            template: "\n    <ul class=\"nav nav-tabs nav-justified\">\n      <li *ngFor=\"let tab of tabs\" (click)=\"activate(tab)\" [class.active]=\"tab.active\">\n          <a data-toggle=\"tab\">{{ tab.title }}</a>     \n      </li>\n    </ul>\n    <ng-content></ng-content>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], TabsContainer);
    return TabsContainer;
}());
exports.TabsContainer = TabsContainer;
//# sourceMappingURL=tabContainer.js.map
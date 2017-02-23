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
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var actions_1 = require("./actions");
var ExampleComponent = (function () {
    function ExampleComponent(store) {
        var _this = this;
        this.store = store;
        store
            .select('example')
            .subscribe(function (state) {
            _this.show$ = state.show;
            _this.items$ = state.items;
        });
    }
    ExampleComponent.prototype.toggle = function () {
        this.store.dispatch(actions_1.toggleList(!this.show$));
    };
    ExampleComponent.prototype.remove = function (id) {
        this.store.dispatch(actions_1.removeItem(id));
    };
    ExampleComponent.prototype.restore = function () {
        this.store.dispatch(actions_1.restoreItems());
    };
    return ExampleComponent;
}());
ExampleComponent = __decorate([
    core_1.Component({
        template: "\n    <div>\"Show\" store value is: {{show$}}</div>\n    <div>\n      <button (click)=\"toggle()\">Show list of items</button>\n      <button *ngIf=\"show$\" (click)=\"restore()\">Restore removed items</button>\n    </div>\n    <div *ngIf=\"show$\">\n      <ul>\n        <li *ngFor=\"let item of items$\" (click)=\"remove(item.id)\">\n          <span>Item ID: {{item.id}}</span>,\n          <span>Item Name: {{item.name}}</span>\n        </li>\n      </ul>\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [store_1.Store])
], ExampleComponent);
exports.ExampleComponent = ExampleComponent;
//# sourceMappingURL=index.js.map
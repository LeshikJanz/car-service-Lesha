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
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
var usersNameEmail_service_1 = require("./usersNameEmail.service");
var UserSearchComponent = (function () {
    function UserSearchComponent(userNameEmailService) {
        this.userNameEmailService = userNameEmailService;
        this.terms = new Subject_1.Subject();
    }
    UserSearchComponent.prototype.search = function (term) {
        this.terms.next(term);
    };
    UserSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.users = this.terms
            .debounceTime(600)
            .distinctUntilChanged()
            .switchMap(function (t) { return t ?
            _this.userNameEmailService.searchUser(t) :
            Observable_1.Observable.of([]); })
            .catch(function (error) {
            console.log(error);
            return Observable_1.Observable.of([]);
        });
        var s = "F";
    };
    UserSearchComponent.prototype.get = function () {
        this.userNameEmailService.searchUser("r")
            .subscribe(function (u) {
            var c = u;
        });
        var a = 2;
    };
    return UserSearchComponent;
}());
UserSearchComponent = __decorate([
    core_1.Component({
        selector: 'user-search',
        templateUrl: 'user-search.component.html',
        providers: [usersNameEmail_service_1.UserNameEmailService]
    }),
    __metadata("design:paramtypes", [usersNameEmail_service_1.UserNameEmailService])
], UserSearchComponent);
exports.UserSearchComponent = UserSearchComponent;
//# sourceMappingURL=user-search.component.js.map
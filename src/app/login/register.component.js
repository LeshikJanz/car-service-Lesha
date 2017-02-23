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
var router_1 = require("@angular/router");
var userRegister_1 = require("./userRegister");
var account_service_1 = require("./account.service");
var RegisterComponent = (function () {
    function RegisterComponent(_router, accountService) {
        this._router = _router;
        this.accountService = accountService;
        this.active = true;
        this.userRegister = new userRegister_1.userRegister("", "", "", "", 0, 0, "");
    }
    RegisterComponent.prototype.submitRegister = function () {
        var _this = this;
        this.accountService.Register(this.userRegister)
            .subscribe(function (res) {
            if (res.status == 200) {
                _this._router.navigate(['dashboard']);
            }
        }, function (error) {
            var e = error;
        });
    };
    RegisterComponent.prototype.clearForm = function () {
        var _this = this;
        this.userRegister = new userRegister_1.userRegister("", "", "", "", 0, 0, "");
        this.active = false;
        setTimeout(function () { return _this.active = true; }, 0);
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        selector: 'register',
        templateUrl: 'register.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        account_service_1.AccountService])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map
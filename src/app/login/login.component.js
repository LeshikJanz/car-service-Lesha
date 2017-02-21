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
var userInfo_1 = require('./userInfo');
var router_1 = require('@angular/router');
var account_service_1 = require('./account.service.ts');
var login_service_1 = require('../jobCard/login.service.ts');
var userInfo_service_1 = require('./userInfo.service.ts');
var LoginComponent = (function () {
    function LoginComponent(_router, _accountService, userInfoService, _loginService) {
        this._router = _router;
        this._accountService = _accountService;
        this.userInfoService = userInfoService;
        this._loginService = _loginService;
        this.active = true;
        this.isLogged = false;
        this.messege = "";
        this.userInfo = new userInfo_1.userInfo("", "", "");
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.submitLogin = function () {
        var _this = this;
        this.userInfo.grant_type = "password";
        this._accountService.login(this.userInfo)
            .subscribe(function (res) {
            if (res['token_type'] == "bearer") {
                sessionStorage.setItem('User', res['userName']);
                sessionStorage.setItem(res['token_type'], res['access_token']);
                _this.userInfoService.getUserInfo()
                    .subscribe(function (res) {
                    var respo = res;
                    if (respo['Roles'].includes('Admin')) {
                        sessionStorage.setItem('Role', 'Admin');
                    }
                    sessionStorage.setItem('DepCode', respo['DepCode']);
                    sessionStorage.setItem('EmpID', respo['EmpID']);
                    sessionStorage.setItem('SapDataBase', respo['SapDataBase']);
                }, function (error) {
                    _this.errorMessege = error;
                });
                _this._loginService.login().then(function (res) {
                    _this._router.navigate(['dashboard']);
                });
            }
        }, function (error) {
            _this.errorMessege = error;
        });
    };
    ;
    LoginComponent.prototype.skip = function () {
        var _this = this;
        this._loginService.login().then(function (res) {
            _this._router.navigate(['dashboard']);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'xioma-login',
            templateUrl: 'app/login/login.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, account_service_1.AccountService, userInfo_service_1.UserInfoService, login_service_1.LoginService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map
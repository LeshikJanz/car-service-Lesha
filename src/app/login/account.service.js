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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var AccountService = (function () {
    function AccountService(_http) {
        this._http = _http;
        this._loginUrl = 'http://localhost:57939/Token';
        this._userInfoUrl = 'http://localhost:57939/api/Account/UserInfo';
        this._registerUrl = 'http://localhost:57939/api/Account/Register';
        this.myHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    AccountService.prototype.login = function (userInfo) {
        var myHeders = new http_1.Headers();
        myHeders.append("Content-Type", "application/x-www-form-urlencoded");
        return this._http.post(this._loginUrl, this.transformRequest(userInfo), { headers: myHeders })
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AccountService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    AccountService.prototype.transformRequest = function (userInfo) {
        var strArr = [];
        for (var item in userInfo) {
            strArr.push(encodeURIComponent(item) + "=" +
                encodeURIComponent(userInfo[item]));
        }
        return strArr.join("&");
    };
    AccountService.prototype.Register = function (RegisterForm) {
        var token = sessionStorage.getItem('bearer');
        this.myHeaders = new http_1.Headers();
        if (token) {
            this.myHeaders.append('authorization', 'Bearer ' + token);
            this.myHeaders.append('Content-Type', 'application/json');
        }
        return this._http.post(this._registerUrl, RegisterForm, { headers: this.myHeaders }).map(function (response) { return response; })
            .catch(this.handleError);
    };
    AccountService.prototype.transformRequestReg = function (RegisterForm) {
        var strArr = [];
        for (var item in RegisterForm) {
            strArr.push(encodeURIComponent(item) + "=" +
                encodeURIComponent(RegisterForm[item]));
        }
        return strArr.join("&");
    };
    AccountService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map
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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var AccountService = (function () {
    function AccountService(_http) {
        this._http = _http;
        // private _loginUrl = 'http://52.31.155.217:300/Token';
        // private _userInfoUrl = 'http://52.31.155.217:300/api/Account/UserInfo';
        // private _registerUrl = 'http://52.31.155.217:300/api/Account/Register';
        this.myHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    AccountService.prototype.ngOnInit = function () {
        this.setUrls();
    };
    AccountService.prototype.setUrls = function () {
        this.baseUrl = sessionStorage.getItem("UserServiceIp");
        //this.baseUrl = 'http://localhost:57939/';
        //this.baseUrl = 'http://52.212.106.164:300/';
        this._loginUrl = this.baseUrl + 'Token';
        this._userInfoUrl = this.baseUrl + 'api/Account/UserInfo';
        this._registerUrl = this.baseUrl + 'api/Account/Register';
        this._logoffUrl = this.baseUrl + 'api/Account/Logout';
    };
    AccountService.prototype.login = function (userInfo) {
        this.setUrls();
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
    AccountService.prototype.logout = function () {
        var token = sessionStorage.getItem('bearer');
        this.myHeaders = new http_1.Headers();
        if (token) {
            this.myHeaders.append('authorization', 'Bearer ' + token);
        }
        return this._http.post(this._logoffUrl, "", { headers: this.myHeaders })
            .map(function (response) { return response; })
            .catch(this.handleError);
    };
    return AccountService;
}());
AccountService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map
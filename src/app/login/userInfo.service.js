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
var UserInfoService = (function () {
    function UserInfoService(_http) {
        this._http = _http;
        // private _userInfoUrl = 'http://52.31.155.217:300/api/Account/UserInfo';
        this.myHeaders = new http_1.Headers();
        this.baseUrl = sessionStorage.getItem("UserServiceIp");
        //this.baseUrl = 'http://localhost:57939/';
        this._userInfoUrl = this.baseUrl + 'api/Account/UserInfo';
    }
    UserInfoService.prototype.getUserInfo = function () {
        this.baseUrl = sessionStorage.getItem("UserServiceIp");
        this._userInfoUrl = this.baseUrl + 'api/Account/UserInfo';
        var token = sessionStorage.getItem('bearer');
        this.myHeaders = new http_1.Headers();
        if (token) {
            this.myHeaders.append('authorization', 'Bearer ' + token);
        }
        return this._http.get(this._userInfoUrl, { headers: this.myHeaders })
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserInfoService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    return UserInfoService;
}());
UserInfoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserInfoService);
exports.UserInfoService = UserInfoService;
//# sourceMappingURL=userInfo.service.js.map
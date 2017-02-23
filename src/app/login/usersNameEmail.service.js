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
var UserNameEmailService = (function () {
    function UserNameEmailService(_http) {
        this._http = _http;
        this.myHeaders = new http_1.Headers();
        this.baseUrl = sessionStorage.getItem("UserServiceIp");
        this.userNameUrl = this.baseUrl + 'api/Account/GetUser';
        this.userEmailUrl = this.baseUrl + 'api/Account/GetUsersEmail';
        this.userUrl = this.baseUrl + '/api/Account/GetSearchUsers';
    }
    UserNameEmailService.prototype.getUsersNames = function (userName) {
        this.adjustHeaders();
        return this._http.get((this.userNameUrl + "(" + userName + ")"), { headers: this.myHeaders })
            .map(function (response) { return response.json(); });
    };
    UserNameEmailService.prototype.getUsersEmail = function (emailDec) {
        this.adjustHeaders();
        var emailEN = emailDec.split('.').join('~~');
        return this._http.get(this.userEmailUrl + "(" + emailEN + ")", { headers: this.myHeaders })
            .map(function (response) { return response.json(); });
    };
    UserNameEmailService.prototype.searchUser = function (term) {
        this.adjustHeaders();
        return this._http.get(this.userUrl + "(" + term + ")", { headers: this.myHeaders })
            .map(function (r) { return r['_body']; });
        //return null;
    };
    UserNameEmailService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    UserNameEmailService.prototype.adjustHeaders = function () {
        var token = sessionStorage.getItem('bearer');
        this.myHeaders = new http_1.Headers();
        if (token) {
            this.myHeaders.append('authorization', 'Bearer ' + token);
        }
    };
    return UserNameEmailService;
}());
UserNameEmailService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserNameEmailService);
exports.UserNameEmailService = UserNameEmailService;
//# sourceMappingURL=usersNameEmail.service.js.map
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
var LoginService = (function () {
    function LoginService(_http) {
        this._http = _http;
        this._baseUrlSWEETWOKXX = 'https://52.213.80.73:50000/';
        this._baseUrlPRODUCTIONTEST = 'https://10.0.1.43:50004/';
        this._loginUrl = "";
        this._logoutUrl = "";
        this._companyInfoUrl = "";
        this.loginCredSWEETWOKXX = {
            "CompanyDB": "SWEETWOKXX",
            "UserName": "manager",
            "Password": "123456"
        };
        this.loginCredPRODUCTIONTEST = {
            "CompanyDB": "PRODUCTIONTEST",
            "UserName": "manager",
            "Password": "123456"
        };
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    // login(): Observable<any[]> {
    //     return this._http.post(this._loginUrl, JSON.stringify(this.loginCred), 
    //     {headers: this.headers, withCredentials:true})
    //         .map((response: Response) => <any[]>response.json())
    //         .catch(this.handleError);
    // }
    LoginService.prototype.login = function () {
        var _this = this;
        var loginCred = this.getCred();
        return new Promise(function (resolve, reject) {
            _this._http.post(_this._loginUrl, JSON.stringify(loginCred), { headers: _this.headers, withCredentials: true })
                .map(function (response) { return response.json(); })
                .catch(_this.handleError)
                .subscribe(function (data) { resolve(data); }, function (error) { return reject(error); });
        });
    };
    LoginService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    LoginService.prototype.logout = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this._logoutUrl, "", { headers: headers, withCredentials: true })
            .map(function (response) {
            return response;
        })
            .catch(this.handleError);
    };
    LoginService.prototype.companyInfo = function () {
        var _this = this;
        var loginCred = this.getCred();
        return new Promise(function (resolve, reject) {
            _this._http.post(_this._companyInfoUrl, { "company_name": loginCred.CompanyDB }, { headers: _this.headers, withCredentials: true })
                .map(function (response) { return response.json(); })
                .catch(_this.handleError)
                .subscribe(function (data) { resolve(data); }, function (error) { return reject(error); });
        });
    };
    LoginService.prototype.getCred = function () {
        var loginCred = this.loginCredSWEETWOKXX;
        var db = sessionStorage.getItem("SapDB");
        switch (db) {
            case "SWEETWOKXX":
                loginCred = this.loginCredSWEETWOKXX;
                if (this._loginUrl == "") {
                    this._loginUrl = this._baseUrlSWEETWOKXX + 'b1s/v1/Login';
                    this._logoutUrl = this._baseUrlSWEETWOKXX + 'b1s/v1/Logout';
                    this._companyInfoUrl = this._baseUrlSWEETWOKXX + 'b1s/v1/CompanyService_GetCompanyInfo';
                }
                break;
            case "PRODUCTIONTEST":
                loginCred = this.loginCredPRODUCTIONTEST;
                if (this._loginUrl == "") {
                    this._loginUrl = this._baseUrlPRODUCTIONTEST + 'b1s/v1/Login';
                    this._logoutUrl = this._baseUrlPRODUCTIONTEST + 'b1s/v1/Logout';
                    this._companyInfoUrl = this._baseUrlPRODUCTIONTEST + 'b1s/v1/CompanyService_GetCompanyInfo';
                }
                break;
            default:
                loginCred = this.loginCredSWEETWOKXX;
        }
        return loginCred;
    };
    return LoginService;
}());
LoginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map
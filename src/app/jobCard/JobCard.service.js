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
var JobCardService = (function () {
    function JobCardService(http) {
        this.http = http;
        this._jobCardUrl = 'https://52.31.210.169:50000/b1s/v1/XIS_Jbs_UO';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    JobCardService.prototype.getJobCard = function (page) {
        if (page === void 0) { page = 0; }
        var EmpId = sessionStorage.getItem("EmpID");
        EmpId = null;
        var pageSize = 15;
        var skip = page * pageSize;
        var innerUrl = this._jobCardUrl.concat("?$top=" + pageSize + "&$skip=" + skip + "&$filter=(U_JCManager eq " + EmpId + " \n            or U_SerCons eq " + EmpId + ") and Status eq 'O'&$inlinecount=allpages");
        //innerUrl = this._jobCardUrl;
        return this.http.get(innerUrl, { headers: this.headers,
            withCredentials: true })
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    JobCardService.prototype.getTimeReportingItemsCount = function () {
        var _this = this;
        var EmpId = sessionStorage.getItem("EmpID");
        EmpId = null;
        var DepCpde = sessionStorage.getItem("DepCode");
        DepCpde = '1';
        var innerUrl = this._jobCardUrl.concat("/$count?$filter=(U_JCManager eq " + EmpId + " \n            or U_SerCons eq " + EmpId + " or U_Dep eq '" + DepCpde + "') and Status eq 'O'");
        return new Promise(function (resolve, reject) {
            _this.http.get(innerUrl, { headers: _this.headers,
                withCredentials: true })
                .map(function (response) { return response; })
                .catch(_this.handleError)
                .subscribe(function (data) {
                resolve(data);
            }, function (error) { return reject(error); });
        });
    };
    JobCardService.prototype.getCheckListItemsCount = function () {
        var _this = this;
        var EmpId = sessionStorage.getItem("EmpID");
        EmpId = null;
        var DepCpde = sessionStorage.getItem("DepCode");
        DepCpde = '1';
        var innerUrl = this._jobCardUrl.concat("/$count?$filter=(U_JCManager eq " + EmpId + " \n            or U_SerCons eq " + EmpId + ") and Status eq 'O'");
        return new Promise(function (resolve, reject) {
            _this.http.get(innerUrl, { headers: _this.headers,
                withCredentials: true })
                .map(function (response) { return response; })
                .catch(_this.handleError)
                .subscribe(function (data) {
                resolve(data);
            }, function (error) { return reject(error); });
        });
    };
    JobCardService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    JobCardService.prototype.postjob9 = function (item) {
        var opts = {
            headers: this.headers,
            withCredentials: true
        };
        var body = { "XIS_JOBS9Collection": [{
                    "LineId": item.LineId,
                    "U_TaskStts": item.U_TaskStts,
                    "U_Notes": item.U_Notes
                }] };
        var innerUrl = this._jobCardUrl.concat("(" + item.DocEntry + ")");
        return this.http.patch(innerUrl, body, opts)
            .map(function (response) { return response; })
            .catch(this.handleError);
    };
    JobCardService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], JobCardService);
    return JobCardService;
}());
exports.JobCardService = JobCardService;
//# sourceMappingURL=JobCard.service.js.map
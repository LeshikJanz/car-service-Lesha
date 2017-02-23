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
var JobCardStatusLoaderService = (function () {
    function JobCardStatusLoaderService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.sttsCollection = new Array();
    }
    JobCardStatusLoaderService.prototype.loadStatuses = function () {
        var _this = this;
        var jobCardUrlBase = "";
        var db = sessionStorage.getItem("SapDB");
        switch (db) {
            case "SWEETWOKXX":
                jobCardUrlBase = 'https://52.31.210.169:50000/b1s/v1/U_XIS_JOBSTTS';
                break;
            case "PRODUCTIONTEST":
                jobCardUrlBase = 'https://10.0.1.43:50004/b1s/v1/U_XIS_JOBSTTS';
                break;
            default:
        }
        var countUrl = jobCardUrlBase + '/$count?';
        var count = 0;
        this.sttsCount(countUrl).then(function (res) {
            count = res;
            var jobCardUrl = jobCardUrlBase;
            var skip = 0;
            do {
                jobCardUrl = jobCardUrlBase + ("?$skip=" + skip);
                _this.request(jobCardUrl).subscribe(function (res) {
                    res['value'].forEach(function (element) {
                        _this.sttsCollection.push(element);
                    });
                }, function (error) {
                    console.error(error);
                });
                skip += 20;
            } while (skip < count);
        });
        return this.sttsCollection;
    };
    JobCardStatusLoaderService.prototype.request = function (jobCardUrl) {
        return this.http.get(jobCardUrl, {
            headers: this.headers,
            withCredentials: true
        }).map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    JobCardStatusLoaderService.prototype.sttsCount = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(url, {
                headers: _this.headers,
                withCredentials: true
            }).map(function (response) { return response.json(); })
                .catch(_this.handleError)
                .subscribe(function (data) {
                resolve(data);
            }, function (error) { return reject(error); });
        });
    };
    JobCardStatusLoaderService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    return JobCardStatusLoaderService;
}());
JobCardStatusLoaderService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], JobCardStatusLoaderService);
exports.JobCardStatusLoaderService = JobCardStatusLoaderService;
//# sourceMappingURL=jobCardStatusLoader.service.js.map
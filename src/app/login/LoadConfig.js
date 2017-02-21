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
var LoadConfigService = (function () {
    function LoadConfigService(http) {
        this.http = http;
        this.configUrl = '../../public/config.json';
    }
    LoadConfigService.prototype.loadData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.configUrl)
                .map(function (response) { return response; })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) { return reject(error); });
        });
    };
    LoadConfigService.prototype.load = function () {
        var _this = this;
        this.loadData().then(function (res) {
            _this.valueOut = JSON.parse(res['_body']);
            var value = _this.valueOut;
            sessionStorage.setItem("JobCardStatusClose", value.JobCardStatusClose);
            sessionStorage.setItem("CheckListStatusOpen", value.CheckListStatusOpen);
            sessionStorage.setItem("JobCardSort1", value.JobCardSort1);
            sessionStorage.setItem("JobCardSort2", value.JobCardSort2);
            sessionStorage.setItem("TimeReportingStatusOpen", value.TimeReportingStatusOpen);
            sessionStorage.setItem("Vi icon", value.Viicon);
            sessionStorage.setItem("X icon", value.Xicon);
            sessionStorage.setItem("? icon", value.Qicon);
            sessionStorage.setItem("MaxRecordForJobCardPage", value.MaxRecordForJobCardPage);
            sessionStorage.setItem("UserServiceIp", value.UserServiceIp);
        });
    };
    LoadConfigService.prototype.setParam = function (value) {
        sessionStorage.setItem("JobCardStatusClose", value.JobCardStatusClose);
        sessionStorage.setItem("CheckListStatusOpen", value.CheckListStatusOpen);
        sessionStorage.setItem("JobCardSort1", value.JobCardSort1);
        sessionStorage.setItem("JobCardSort2", value.JobCardSort2);
        sessionStorage.setItem("TimeReportingStatusOpen", value.TimeReportingStatusOpen);
        sessionStorage.setItem("Vi icon", value.Viicon);
        sessionStorage.setItem("X icon", value.Xicon);
        sessionStorage.setItem("? icon", value.Qicon);
        sessionStorage.setItem("MaxRecordForJobCardPage", value.MaxRecordForJobCardPage);
        sessionStorage.setItem("UserServiceIp", value.UserServiceIp);
    };
    LoadConfigService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LoadConfigService);
    return LoadConfigService;
}());
exports.LoadConfigService = LoadConfigService;
//# sourceMappingURL=LoadConfig.js.map
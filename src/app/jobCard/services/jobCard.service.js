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
var JobCardService = (function () {
    function JobCardService(http) {
        // var AllCloseStts = sessionStorage.getItem('JobCardStatusClose');
        // this.sttsAll = '';
        // //this.sttsOpen = 'and Status ne';
        // var SttsArr = AllCloseStts.split(',');
        // this.sttsOpen = " ";
        // this.sttsClose = "and (";
        // SttsArr.forEach(element => {
        //     this.sttsOpen += "and U_Status ne '" + element + "'";
        //     this.sttsClose += "U_Status eq '" + element + "' or ";
        // });
        this.http = http;
        //private _baseUrlSWEETWOKXX = 'https://52.31.210.169:50000/';
        //private _baseUrlPRODUCTIONTEST = 'https://10.0.1.43:50004/';
        this._jobCardUrl = "";
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        // this.sttsClose += ")";
        // this.sttsClose = this.sttsClose.replace("or )", ")");
    }
    JobCardService.prototype.getJobCard = function (term, FilterOption, page) {
        if (page === void 0) { page = 0; }
        var EmpId = sessionStorage.getItem("EmpID");
        //EmpId = null;
        var pageSize = 15;
        var skip = page * pageSize;
        var firstOrder = sessionStorage.getItem('JobCardSort1');
        var secondOrder = sessionStorage.getItem('JobCardSort2');
        var currentFilterOption = this.filterOptionSelector(FilterOption);
        var search = this.buildSearchString(term);
        var innerUrl = this._jobCardUrl.concat("?$filter=" + search + "(U_JCManager eq '" + EmpId + "' \n            or U_SerCons eq '" + EmpId + "')" + currentFilterOption + "&$inlinecount=allpages\n            &$orderby=" + firstOrder + "," + secondOrder + "&$top=" + pageSize + "&$skip=" + skip);
        return this.http.get(innerUrl, {
            headers: this.headers,
            withCredentials: true
        })
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    JobCardService.prototype.getTimeReport = function (term, FilterOption, page) {
        if (page === void 0) { page = 0; }
        var EmpId = sessionStorage.getItem("EmpID");
        //EmpId = null;
        var DepCode = sessionStorage.getItem("DepCode");
        //DepCode = '1';
        var pageSize = 15;
        var skip = page * pageSize;
        var firstOrder = sessionStorage.getItem('JobCardSort1');
        var secondOrder = sessionStorage.getItem('JobCardSort2');
        var currentFilterOption = this.filterOptionSelector(FilterOption);
        var search = this.buildSearchString(term);
        var innerUrl = this._jobCardUrl.concat("?$filter=" + search + "(U_JCManager eq '" + EmpId + "' \n            or U_SerCons eq '" + EmpId + "' or U_Dep eq '" + DepCode + "')" + currentFilterOption + "&$inlinecount=allpages\n            &$orderby=" + firstOrder + "," + secondOrder + "&$top=" + pageSize + "&$skip=" + skip);
        return this.http.get(innerUrl, {
            headers: this.headers,
            withCredentials: true
        })
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    JobCardService.prototype.getTimeReportingItemsCount = function () {
        var _this = this;
        var EmpId = sessionStorage.getItem("EmpID");
        //EmpId = null;
        var DepCpde = sessionStorage.getItem("DepCode");
        //DepCpde = '1';
        var innerUrl = this._jobCardUrl.concat("/$count?$filter=(U_JCManager eq '" + EmpId + "' \n            or U_SerCons eq '" + EmpId + "' or U_Dep eq '" + DepCpde + "')" + this.sttsOpen);
        return new Promise(function (resolve, reject) {
            _this.http.get(innerUrl, {
                headers: _this.headers,
                withCredentials: true
            })
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
        //EmpId = null;
        var DepCpde = sessionStorage.getItem("DepCode");
        //DepCpde = '1';
        var innerUrl = this._jobCardUrl.concat("/$count?$filter=(U_JCManager eq '" + EmpId + "' \n            or U_SerCons eq '" + EmpId + "')" + this.sttsOpen);
        return new Promise(function (resolve, reject) {
            _this.http.get(innerUrl, {
                headers: _this.headers,
                withCredentials: true
            })
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
        var body = {
            "XIS_JOBS9Collection": [{
                    "LineId": item.LineId,
                    "U_TaskStts": item.U_TaskStts,
                    "U_Notes": item.U_Notes,
                    "U_RsrcCode": item.U_RsrcCode,
                    "U_StrtDate": item.U_StrtDate,
                    "U_StrtHour": item.U_StrtHour,
                    "U_Source": item.U_Source,
                    "U_Attach": item.U_Attach
                }]
        };
        var innerUrl = this._jobCardUrl.concat("(" + item.DocEntry + ")");
        return this.http.patch(innerUrl, body, opts)
            .map(function (response) { return response; })
            .catch(this.handleError);
    };
    JobCardService.prototype.postjob11 = function (item) {
        var opts = {
            headers: this.headers,
            withCredentials: true
        };
        var body = {
            "XIS_JOBS11Collection": [{
                    "LineId": item.LineId,
                    "U_JobLine": item.U_JobLine,
                    "U_EMPID": item.U_EMPID,
                    "U_RprtType": item.U_RprtType,
                    "U_FromDt": item.U_FromDt,
                    "U_FromHr": item.U_FromHr,
                    "U_ToHr": item.U_ToHr,
                    "U_TotalHrs": item.U_TotalHrs,
                }]
        };
        var innerUrl = this._jobCardUrl.concat("(" + item.DocEntry + ")");
        return this.http.patch(innerUrl, body, opts)
            .map(function (response) { return response; })
            .catch(this.handleError);
    };
    JobCardService.prototype.filterOptionSelector = function (FilterOption) {
        this.UrlSetter();
        if (FilterOption == 'Open') {
            return this.sttsOpen;
        }
        else {
            if (FilterOption == 'Close') {
                return this.sttsClose;
            }
            else {
                return this.sttsAll;
            }
        }
    };
    JobCardService.prototype.buildSearchString = function (term) {
        if (term == "") {
            return "";
        }
        else {
            var str = "(contains(DocNum, '" + term + "') or contains(U_CarID, '" + term + "') \n            or contains(U_OwnBP, '" + term + "') or contains(U_OwnBPN, '" + term + "') \n            or contains(U_OwnCnt, '" + term + "') or contains(U_OwnCntPh, '" + term + "') \n            or contains(U_SpnsrBP, '" + term + "') or contains(U_SpnsrBPN, '" + term + "') \n            or contains(U_SpnCntPh, '" + term + "') or contains(U_MdlCode, '" + term + "') \n            or contains(U_VCode, '" + term + "') or contains(U_LicNum, '" + term + "')) and ";
            return str;
        }
    };
    JobCardService.prototype.UrlSetter = function () {
        var _this = this;
        if (this._jobCardUrl == "") {
            var db = sessionStorage.getItem("SapDB");
            switch (db) {
                case "SWEETWOKXX":
                    this._jobCardUrl = 'https://52.31.210.169:50000/b1s/v1/XIS_Jbs_UO';
                    break;
                case "PRODUCTIONTEST":
                    this._jobCardUrl = 'https://10.0.1.43:50004/b1s/v1/XIS_Jbs_UO';
                    break;
                default:
            }
            var AllCloseStts = sessionStorage.getItem('JobCardStatusClose');
            if (AllCloseStts) {
                this.sttsAll = '';
                //this.sttsOpen = 'and Status ne';
                var SttsArr = AllCloseStts.split(',');
                this.sttsOpen = " ";
                this.sttsClose = "and (";
                SttsArr.forEach(function (element) {
                    _this.sttsOpen += "and U_Status ne '" + element + "'";
                    _this.sttsClose += "U_Status eq '" + element + "' or ";
                });
                this.sttsClose += ")";
                this.sttsClose = this.sttsClose.replace("or )", ")");
            }
        }
    };
    return JobCardService;
}());
JobCardService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], JobCardService);
exports.JobCardService = JobCardService;
//# sourceMappingURL=jobCard.service.js.map
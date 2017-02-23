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
var Observable_1 = require("rxjs/Observable");
var XIS_JOBS2Collection_1 = require("../variables/XIS_JOBS2Collection");
var XIS_JOBS11Collection_1 = require("../variables/XIS_JOBS11Collection");
var JobCardTimeReportComponent = (function () {
    function JobCardTimeReportComponent() {
        this.HasActiveLine = false;
        this._sec = 0;
    }
    Object.defineProperty(JobCardTimeReportComponent.prototype, "sec", {
        get: function () {
            if (this._sec != 0) {
            }
            if (!isNaN(this._sec)) {
                return this._sec;
            }
            else {
                return 0;
            }
        },
        set: function (theSec) {
            if (theSec != NaN) {
                this._sec = theSec;
            }
            else {
                this._sec = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    JobCardTimeReportComponent.prototype.ngOnInit = function () {
    };
    JobCardTimeReportComponent.prototype.ngOnChanges = function () {
        if (this.timeReportItems && this.timeReportItems.filter(function (element) { return (element.U_PartCode != null); }).length > 0) {
            var temp_1 = new XIS_JOBS2Collection_1.XIS_JOBS2Collection();
            // temp.U_Dep = sessionStorage.getItem('DepCode');
            temp_1.U_PartCode = "Job card general time entry";
            temp_1.DocEntry = this.docEntry;
            var a = this.timeReportItems.filter(function (element) { return (element.U_PartCode == temp_1.U_PartCode); });
            if (this.timeReportItems.filter(function (element) { return (element.U_PartCode == temp_1.U_PartCode); })
                .length == 0) {
                this.timeReportItems.push(temp_1);
            }
            this.pick(this.timeReportItems[0]);
            this.getColl11Line(this.timeReportItems[0].LineId);
        }
    };
    JobCardTimeReportComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    JobCardTimeReportComponent.prototype.pick = function (item) {
        if (item != this.selected) {
            this.selected = item;
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
            this.sec = 0;
            this.getColl11Line(this.selected.LineId);
        }
    };
    JobCardTimeReportComponent.prototype.getColl11Line = function (lineId) {
        var _this = this;
        if (this.timeReport11 && this.timeReport11.length > 0) {
            var lines = this.timeReport11.filter(function (x) {
                return (x.U_JobLine == lineId && x.U_ToHr == null &&
                    x.U_FromHr != null);
            });
            var line = lines[lines.length - 1];
            if (line) {
                this.HasActiveLine = true;
                line.newLine = false;
                this.timeLine = line;
                var timer = Observable_1.Observable.timer(0, 1000);
                var b = this.dateFromString(line.U_FromDt, line.U_FromHr);
                if (isNaN(b) || b == undefined) {
                    this.HasActiveLine = false;
                    return;
                }
                var a = (Date.now() - b);
                if (this.subscription) {
                    this.sec = 0;
                    this.subscription.unsubscribe();
                }
                this.subscription = timer.subscribe(function (t) {
                    return (_this.sec = (a + (t * 1000)));
                });
            }
            else {
                this.HasActiveLine = false;
                this.timeLine = null;
            }
        }
        else {
            this.HasActiveLine = false;
            this.timeLine = null;
        }
    };
    JobCardTimeReportComponent.prototype.start = function () {
        var _this = this;
        this.setDirty;
        this.timeLine = new XIS_JOBS11Collection_1.XIS_JOBS11Collection;
        this.timeLine.DocEntry = this.selected.DocEntry;
        this.timeLine.newLine = true;
        this.timeLine.U_EMPID = localStorage.getItem('EmpId');
        var d = Date.now();
        this.timeLine.startTime = d;
        var start = new Date(d).toLocaleDateString('en-US');
        start = start.replace(".", "-").replace(".", "-");
        start = start.replace("/", "-").replace("/", "-");
        start = start.split('-').reverse().join('-');
        this.timeLine.U_FromDt = start;
        this.timeLine.U_FromHr = new Date(d).toLocaleTimeString('en-US', { hour12: false });
        this.timeLine.U_JobLine = this.selected.LineId;
        this.timeLine.U_RprtType = 'RealTime';
        var timer = Observable_1.Observable.timer(0, 1000);
        this.subscription = timer.subscribe(function (t) { return (_this.sec = t * 1000); });
        this.timeReport11.push(this.timeLine);
        this.HasActiveLine = true;
    };
    JobCardTimeReportComponent.prototype.stop = function () {
        this.setDirty;
        var d = Date.now();
        this.timeLine.newLine = true;
        this.timeLine.U_ToHr = new Date(d).toLocaleTimeString('en-US', { hour12: false });
        this.timeLine.endTime = d;
        this.timeLine.startTime = this.dateFromString(this.timeLine.U_FromDt, this.timeLine.U_FromHr);
        var t = new Date(this.timeLine.endTime).valueOf() -
            new Date(this.timeLine.startTime).valueOf();
        this.sec = this.sec;
        this.timeLine.U_TotalHrs = (t / 3600000).toFixed(1);
        this.HasActiveLine = false;
        this.subscription.unsubscribe();
    };
    JobCardTimeReportComponent.prototype.setDirty = function () {
        this.selected.job2Dirty = true;
    };
    JobCardTimeReportComponent.prototype.dateFromString = function (d, t) {
        if (!d) {
            d = new Date(1970, 11, 13).toLocaleDateString('en-US');
            d = d.replace(".", "-").replace(".", "-");
            d = d.replace("/", "-").replace("/", "-");
            d = d.split('-').reverse().join('-');
        }
        if (d.length < 10) {
            var arr = d.split('-');
            if (arr[1].length < 2) {
                arr[1] = "0" + arr[1];
            }
            if (arr[2].length < 2) {
                arr[2] = "0" + arr[2];
            }
            d = arr.join("-");
        }
        if (t.length < 8) {
            var arr = t.split(':');
            if (arr[0].length < 2) {
                arr[0] = "0" + arr[0];
            }
            if (arr[1].length < 2) {
                arr[1] = "0" + arr[1];
            }
            if (arr[2].length < 2) {
                arr[2] = "0" + arr[2];
            }
            t = arr.join(":");
        }
        var dy = d.substr(0, 4);
        var dd = d.substr(5, 2);
        var dm = d.substr(8, 2);
        d = dy + "-" + dm + "-" + dd;
        var res = new Date(d + 'T' + t).valueOf();
        if (isNaN(res) || res == undefined) {
            d = dy + "-" + dd + "-" + dm;
            res = new Date(d + 'T' + t).valueOf();
        }
        res = res + (new Date().getTimezoneOffset() * 60000);
        return res;
    };
    JobCardTimeReportComponent.prototype.offTimeUpdate = function () {
        this.offTimeStart = this.offTimeStart + ":00";
        this.offTimeEnd = this.offTimeEnd + ":00";
        var startDate = this.dateFromString(this.offTimeDate.toString(), this.offTimeStart);
        var endDate = 0;
        if (this.offTimeEnd > this.offTimeStart) {
            endDate = this.dateFromString(this.offTimeDate.toString(), this.offTimeEnd);
        }
        else {
            var arr = this.offTimeDate.toString().split('-');
            arr[2] = (+arr[2] + 1).toString();
            var next = arr.join("-");
            endDate = this.dateFromString(next, this.offTimeEnd);
        }
        this.setDirty;
        this.timeLine = new XIS_JOBS11Collection_1.XIS_JOBS11Collection;
        this.timeLine.DocEntry = this.selected.DocEntry;
        this.timeLine.newLine = true;
        this.timeLine.U_EMPID = localStorage.getItem('EmpId');
        this.timeLine.startTime = startDate;
        this.timeLine.U_FromDt = new Date(startDate).toLocaleDateString('en-US')
            .replace(".", "-").replace(".", "-")
            .split('-').reverse().join('-');
        this.timeLine.U_FromHr = new Date(startDate).toLocaleTimeString('en-US', { hour12: false });
        this.timeLine.U_JobLine = this.selected.LineId;
        this.timeLine.U_RprtType = 'OffTime';
        this.timeLine.U_ToHr = new Date(endDate).toLocaleTimeString('en-US', { hour12: false });
        this.timeLine.endTime = endDate;
        var t = endDate - startDate;
        this.timeLine.U_TotalHrs = (t / 3600000).toFixed(1);
        this.timeReport11.push(this.timeLine);
        this.HasActiveLine = false;
        this.resetForm();
    };
    JobCardTimeReportComponent.prototype.resetForm = function () {
        this.offTimeDate = null;
        this.offTimeStart = null;
        this.offTimeEnd = null;
    };
    JobCardTimeReportComponent.prototype.scroll = function (event) {
        if (event.target.localName == 'a') {
            return;
        }
        var element = document.querySelector('.li-checkList.active');
        if (element) {
            element.scrollIntoView(element);
        }
    };
    JobCardTimeReportComponent.prototype.scrollAnc = function (event) {
        var element = document.querySelector('.active .tab-content');
        if (element) {
            element.scrollIntoView(element);
        }
    };
    JobCardTimeReportComponent.prototype.scrollSubmit = function (event) {
        var element = document.querySelector('.active .tab-content');
        if (element) {
            element.scrollIntoView(element);
        }
    };
    return JobCardTimeReportComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], JobCardTimeReportComponent.prototype, "timeReportItems", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], JobCardTimeReportComponent.prototype, "timeReport11", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], JobCardTimeReportComponent.prototype, "docEntry", void 0);
JobCardTimeReportComponent = __decorate([
    core_1.Component({
        selector: 'jobCard-timeReport',
        templateUrl: 'timeReport.html',
        styleUrls: ['../styles/jobCard.css', '../styles/timeReport.css']
    })
], JobCardTimeReportComponent);
exports.JobCardTimeReportComponent = JobCardTimeReportComponent;
//# sourceMappingURL=timeReport.js.map
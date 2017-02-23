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
var jobCard_1 = require("../variables/jobCard");
var jobCard_service_1 = require("../services/jobCard.service");
var picService_1 = require("../services/picService");
var JobCardMasterComponent = (function () {
    function JobCardMasterComponent(_jobCardService, picService) {
        this._jobCardService = _jobCardService;
        this.picService = picService;
        this.selectedUpdate = new core_1.EventEmitter();
        this.GoNext = new core_1.EventEmitter();
        this.GoPrev = new core_1.EventEmitter();
        this.FilterOpt = new core_1.EventEmitter();
        this.searchTerm = new core_1.EventEmitter();
        this.filterOptions = ['All', 'Open', 'Close'];
        this.pickFilter('Open');
    }
    JobCardMasterComponent.prototype.ngOnChanges = function () {
        this.sleep(300);
        if (this.jobItems.length > 0) {
            this.pick(this.jobItems[0]);
            var element = document.querySelector('#Anc');
            element.scrollIntoView(element);
        }
        else {
            var temp = new jobCard_1.JobCard();
            temp.DocNum = "No Items Found";
            this.jobItems.push(temp);
            this.selectedUpdate.emit(null);
        }
        // this.HasNextStr = (this.HasNext ? 'true' : 'false');
        // this.HasPrevStr = (this.HasPrev ? 'true' : 'false');
    };
    JobCardMasterComponent.prototype.pick = function (item) {
        if (!item || item.DocNum == "No Items Found") {
            this.selectedUpdate.emit(null);
            return;
        }
        this.updateSelected(this.selected);
        this.selected = item;
        this.selectedUpdate.emit(item);
        var master = document.querySelector('#master');
        master.classList.add("hidden-xs");
        master.classList.remove("col-xs-12");
        var detail = document.querySelector('#detail');
        detail.classList.remove("hidden-xs");
        detail.classList.add("col-xs-12");
    };
    JobCardMasterComponent.prototype.prev = function () {
        if (!this.HasPrev) {
            return;
        }
        this.updateSelected(this.selected);
        this.GoPrev.emit("Prev");
    };
    JobCardMasterComponent.prototype.next = function () {
        if (!this.HasNext) {
            return;
        }
        this.updateSelected(this.selected);
        this.GoNext.emit("Next");
    };
    JobCardMasterComponent.prototype.updateSelected = function (item) {
        var _this = this;
        if (this.selected) {
            this.selected.XIS_JOBS9Collection.forEach(function (element) {
                if (element.job9Dirty) {
                    element.job9Dirty = false;
                    if (element.pic != null) {
                        element.U_Attach = element.DocEntry +
                            "_" + element.LineId;
                    }
                    _this._jobCardService.postjob9(element)
                        .subscribe(function (res) { return _this.respo = res; });
                    if (element.pic != null) {
                        var path = "JobCard_" + element.DocEntry +
                            "_CheckList_" + element.LineId;
                        var arr = new Array();
                        arr.push(element.pic);
                        _this.picService.makeFileRequest(path, arr);
                    }
                }
            });
            this.selected.XIS_JOBS11Collection.forEach(function (element) {
                if (element.newLine) {
                    element.newLine = false;
                    _this._jobCardService.postjob11(element)
                        .subscribe(function (res) { return _this.respo = res; });
                }
            });
        }
    };
    JobCardMasterComponent.prototype.pickFilter = function (opt) {
        this.selecterFilter = opt;
        this.FilterOpt.emit(opt);
    };
    JobCardMasterComponent.prototype.preformSearch = function () {
        // if(this.searchVal != ""){
        //     this.searchTerm.emit(this.searchVal);
        //     this.searchVal = "";
        // }
        if (!this.searchVal) {
            this.searchVal = "";
        }
        this.searchTerm.emit(this.searchVal);
        this.searchVal = "";
    };
    JobCardMasterComponent.prototype.refreshList = function () {
        this.preformSearch();
    };
    JobCardMasterComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    return JobCardMasterComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], JobCardMasterComponent.prototype, "jobItems", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", jobCard_1.JobCard)
], JobCardMasterComponent.prototype, "selected", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], JobCardMasterComponent.prototype, "HasNext", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], JobCardMasterComponent.prototype, "HasPrev", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], JobCardMasterComponent.prototype, "selectedUpdate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], JobCardMasterComponent.prototype, "GoNext", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], JobCardMasterComponent.prototype, "GoPrev", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], JobCardMasterComponent.prototype, "FilterOpt", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], JobCardMasterComponent.prototype, "searchTerm", void 0);
JobCardMasterComponent = __decorate([
    core_1.Component({
        selector: 'jobCard-master',
        templateUrl: 'jobCardMaster.html',
        styleUrls: ['../styles/jobCard.css']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof jobCard_service_1.JobCardService !== "undefined" && jobCard_service_1.JobCardService) === "function" && _a || Object, picService_1.picService])
], JobCardMasterComponent);
exports.JobCardMasterComponent = JobCardMasterComponent;
var _a;
//# sourceMappingURL=jobCardMaster.js.map
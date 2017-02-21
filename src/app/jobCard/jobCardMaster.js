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
var jobCard_1 = require('./jobCard');
var JobCard_service_1 = require('./jobCard.service.ts');
var JobCardMasterComponent = (function () {
    function JobCardMasterComponent(_jobCardService) {
        this._jobCardService = _jobCardService;
        this.selectedUpdate = new core_1.EventEmitter();
        this.GoNext = new core_1.EventEmitter();
        this.GoPrev = new core_1.EventEmitter();
    }
    JobCardMasterComponent.prototype.ngOnChanges = function () {
        this.pick(this.jobItems[0]);
        // this.HasNextStr = (this.HasNext ? 'true' : 'false');
        // this.HasPrevStr = (this.HasPrev ? 'true' : 'false');
    };
    JobCardMasterComponent.prototype.pick = function (item) {
        this.updateSelected(this.selected);
        this.selected = item;
        this.selectedUpdate.emit(item);
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
                    _this._jobCardService.postjob9(element)
                        .subscribe(function (res) { return _this.respo = res; });
                }
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], JobCardMasterComponent.prototype, "jobItems", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', jobCard_1.JobCard)
    ], JobCardMasterComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], JobCardMasterComponent.prototype, "HasNext", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], JobCardMasterComponent.prototype, "HasPrev", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], JobCardMasterComponent.prototype, "selectedUpdate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], JobCardMasterComponent.prototype, "GoNext", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], JobCardMasterComponent.prototype, "GoPrev", void 0);
    JobCardMasterComponent = __decorate([
        core_1.Component({
            selector: 'jobCard-master',
            template: "\n    <div class=\"panel panel-default\">\n        <div class=\"panel-heading\">\n        </div>\n        <ul class=\"nav nav-pills nav-stacked\">\n            <li \n                *ngFor=\"let item of jobItems\"\n                role=\"presentation\"\n                [class.active]=\"selected == item\">\n                <a (click)=\"pick(item)\">\n                 <h3>{{ item.DocNum }}</h3>\n                 <p>\n                    {{ item.U_OwnBPN }}\n                    {{ item.U_Status }}\n                    {{ item.U_MdlCode }}\n                    {{ item.U_LicNum }}\n                    {{ item.U_EntryDt }}\n                 </p>\n                </a>\n            </li>\n            <li>\n                <div>\n                    <button class=\"page-button\" type=\"button\" (click)=\"prev()\"\n                        [class.disabled]=\"!HasPrev\" [class.btn-primary]=\"HasPrev\" [class.btn-default]=\"!HasPrev\">\n                        <i class=\"glyphicon glyphicon-arrow-left\"></i>\n                    </button>\n                    <button class=\"page-button btn-primary\" type=\"button\" (click)=\"next()\"\n                        [class.disabled]=\"!HasNext\" [class.btn-primary]=\"HasNext\" [class.btn-default]=\"!HasNext\">\n                        <i class=\"glyphicon glyphicon-arrow-right\"></i>\n                    </button>   \n                </div>            \n            </li>           \n        </ul> \n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [JobCard_service_1.JobCardService])
    ], JobCardMasterComponent);
    return JobCardMasterComponent;
}());
exports.JobCardMasterComponent = JobCardMasterComponent;
//# sourceMappingURL=jobCardMaster.js.map
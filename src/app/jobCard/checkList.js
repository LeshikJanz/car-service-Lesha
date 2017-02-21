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
var JobCardCheckListComponent = (function () {
    function JobCardCheckListComponent() {
        this.commentActive = false;
    }
    JobCardCheckListComponent.prototype.ngOnChanges = function () {
        if (this.checkListItems) {
            this.pick(this.checkListItems[0]);
        }
    };
    JobCardCheckListComponent.prototype.pick = function (item) {
        // if(this.commentActive && this.selected == item){
        //     this.commentActive = false;
        // }
        this.commentActive = false;
        this.selected = item;
    };
    JobCardCheckListComponent.prototype.Stts1 = function () {
        this.selected.U_TaskStts = "1";
        this.setDirty();
    };
    JobCardCheckListComponent.prototype.Stts0 = function () {
        this.selected.U_TaskStts = "0";
        this.setDirty();
    };
    JobCardCheckListComponent.prototype.Stts2 = function () {
        this.selected.U_TaskStts = "2";
        this.setDirty();
    };
    JobCardCheckListComponent.prototype.setDirty = function () {
        this.selected.job9Dirty = true;
    };
    JobCardCheckListComponent.prototype.comment = function (event) {
        if (event.target.parentElement.parentElement.className.search('active') != -1) {
            event.stopPropagation();
        }
        this.commentActive = !this.commentActive;
        this.setDirty();
    };
    JobCardCheckListComponent.prototype.input = function (event) {
        event.stopPropagation();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], JobCardCheckListComponent.prototype, "checkListItems", void 0);
    JobCardCheckListComponent = __decorate([
        core_1.Component({
            selector: 'jobCard-cheackList',
            templateUrl: 'app/jobCard/checkList.html'
        }), 
        __metadata('design:paramtypes', [])
    ], JobCardCheckListComponent);
    return JobCardCheckListComponent;
}());
exports.JobCardCheckListComponent = JobCardCheckListComponent;
//# sourceMappingURL=checkList.js.map
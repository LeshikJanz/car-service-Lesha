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
var store_1 = require("@ngrx/store");
var picService_1 = require("../services/picService");
var checkListActions_1 = require("../actions/checkListActions");
//import { FileUploader } from 'ng2-file-upload'; 
var JobCardCheckListComponent = (function () {
    function JobCardCheckListComponent(picService, store) {
        var _this = this;
        this.picService = picService;
        this.store = store;
        this.commentActive = false;
        store
            .select('checklist')
            .subscribe(function (state) {
            _this.items$ = state.items;
            _this.isOrderConfirmed$ = state.isOrderConfirmed;
            _this.isOrderDeclined$ = state.isOrderDeclined;
            _this.isOrderHaveQuestion$ = state.isOrderHaveQuestion;
            _this.comment$ = state.comment;
        });
    }
    JobCardCheckListComponent.prototype.confirmOrder = function (item) {
        this.store.dispatch(checkListActions_1.confirmOrder(item.LineId));
        this.setDirty();
    };
    JobCardCheckListComponent.prototype.declineOrder = function (item) {
        this.store.dispatch(checkListActions_1.declineOrder(item.LineId));
        this.setDirty();
    };
    JobCardCheckListComponent.prototype.haveQuestionOrder = function (item) {
        this.store.dispatch(checkListActions_1.haveQuestionOrder(item.LineId));
        this.setDirty();
    };
    JobCardCheckListComponent.prototype.ngOnChanges = function () {
        this.store.dispatch(checkListActions_1.fetchOrderList(this.checkListItems));
    };
    JobCardCheckListComponent.prototype.pick = function (item) {
        this.commentActive = false;
        this.selected = item;
    };
    JobCardCheckListComponent.prototype.Change = function (event) {
        this.setDirty();
        var pic = event.currentTarget.files[0];
        this.selected.pic = pic;
    };
    JobCardCheckListComponent.prototype.comment = function (event) {
        this.commentActive = !this.commentActive;
        this.setDirty();
    };
    JobCardCheckListComponent.prototype.setDirty = function () {
        this.selected.job9Dirty = true;
    };
    JobCardCheckListComponent.prototype.onChange = function (event) {
        var files = event.srcElement.files;
        console.log(files);
    };
    JobCardCheckListComponent.prototype.saveComment = function (item) {
        this.store.dispatch(checkListActions_1.addComment(item));
    };
    return JobCardCheckListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], JobCardCheckListComponent.prototype, "checkListItems", void 0);
JobCardCheckListComponent = __decorate([
    core_1.Component({
        selector: 'jobCard-checkList',
        templateUrl: 'checkList.html',
        styleUrls: ['../styles/jobCard.css']
    }),
    __metadata("design:paramtypes", [picService_1.picService, store_1.Store])
], JobCardCheckListComponent);
exports.JobCardCheckListComponent = JobCardCheckListComponent;
//# sourceMappingURL=checkList.js.map
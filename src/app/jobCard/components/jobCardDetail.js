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
var router_1 = require("@angular/router");
var jobCardStatusLoader_service_1 = require("../../services/jobCardStatusLoader.service");
var JobCardDetailComponent = (function () {
    function JobCardDetailComponent(router, JCSttsService) {
        this.router = router;
        this.JCSttsService = JCSttsService;
    }
    JobCardDetailComponent.prototype.ngOnChanges = function () {
        var _this = this;
        if (!this.sttsCollection) {
            this.sttsCollection = this.JCSttsService.loadStatuses();
        }
        if (this.jobCardItem && this.sttsCollection.length > 0) {
            this.jobCardItem.sttsDesc = this.sttsCollection.filter(function (x) { return x.Code == _this.jobCardItem['U_Status']; })[0].U_TypeDesc;
        }
        else {
            if (this.jobCardItem) {
                this.jobCardItem.sttsDesc = "Neuer Auftrag";
            }
        }
        if (!this.jobCardItem) {
            this.slideIn();
        }
    };
    JobCardDetailComponent.prototype.ngOnInit = function () {
        if (this.router.url.indexOf("TR") >= 0) {
            this.cheakList = false;
            this.selected = "TR";
        }
        else {
            this.cheakList = true;
            this.selected = "CL";
        }
    };
    JobCardDetailComponent.prototype.selectTab = function (event) {
        var target = event.currentTarget;
        if (target.attributes.id.nodeValue === "CL") {
            this.selected = "CL";
        }
        else {
            if (target.attributes.id.nodeValue === "TR") {
                this.selected = "TR";
            }
            else {
                this.selected = "GL";
            }
        }
    };
    JobCardDetailComponent.prototype.isSelected = function (name) {
        return this.selected === name;
    };
    JobCardDetailComponent.prototype.slideIn = function () {
        var master = document.querySelector('#master');
        master.classList.remove("hidden-xs");
        master.classList.add("col-xs-12");
        var detail = document.querySelector('#detail');
        detail.classList.remove("col-xs-12");
        detail.classList.add("hidden-xs");
    };
    JobCardDetailComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    return JobCardDetailComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", jobCard_1.JobCard)
], JobCardDetailComponent.prototype, "jobCardItem", void 0);
JobCardDetailComponent = __decorate([
    core_1.Component({
        selector: 'jobCard-detail',
        templateUrl: 'jobCardDetail.html',
        styleUrls: ['../styles/jobCard.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        jobCardStatusLoader_service_1.JobCardStatusLoaderService])
], JobCardDetailComponent);
exports.JobCardDetailComponent = JobCardDetailComponent;
//# sourceMappingURL=jobCardDetail.js.map
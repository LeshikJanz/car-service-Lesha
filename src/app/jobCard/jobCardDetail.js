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
var router_1 = require('@angular/router');
var JobCardDetailComponent = (function () {
    //XIS9: XIS_JOBS9Collection;
    function JobCardDetailComponent(router) {
        this.router = router;
    }
    JobCardDetailComponent.prototype.ngOnChanges = function () {
    };
    JobCardDetailComponent.prototype.ngOnInit = function () {
        if (this.router.url.endsWith("TR")) {
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
            if (target.attributes.id.nodeValue === "CL") {
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', jobCard_1.JobCard)
    ], JobCardDetailComponent.prototype, "jobCardItem", void 0);
    JobCardDetailComponent = __decorate([
        core_1.Component({
            selector: 'jobCard-detail',
            templateUrl: '/app/jobCard/jobCardDetail.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], JobCardDetailComponent);
    return JobCardDetailComponent;
}());
exports.JobCardDetailComponent = JobCardDetailComponent;
//# sourceMappingURL=jobCardDetail.js.map
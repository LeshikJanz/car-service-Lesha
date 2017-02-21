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
var JobCard_service_1 = require('./jobCard.service.ts');
var login_service_1 = require('./login.service.ts');
var router_1 = require('@angular/router');
var translate_service_1 = require('./translate.service');
var jobCardListComponent = (function () {
    function jobCardListComponent(_jobCardService, _loginService, t_service, router) {
        this._jobCardService = _jobCardService;
        this._loginService = _loginService;
        this.t_service = t_service;
        this.router = router;
        this.CLTitle = this.t_service.translate("CHECKLIST");
        this.TRTitle = this.t_service.translate("TIMEREPORTING");
        this.jobItems = [];
        this.page = 0;
        this.hasNext = false;
        this.hasPrev = false;
        this.pageSize = 15;
    }
    jobCardListComponent.prototype.ngOnInit = function () {
        if (this.router.url.endsWith("TR")) {
            this.cheakList = false;
        }
        else {
            this.cheakList = true;
        }
        if (this.cheakList) {
            this.getJobCard(0);
        }
        else {
            this.jobItems = [];
        }
    };
    jobCardListComponent.prototype.getJobCard = function (page) {
        var _this = this;
        if (page === void 0) { page = 0; }
        this._jobCardService.getJobCard(page)
            .subscribe(function (jobCardList) {
            _this.jobItems = jobCardList['value'];
            _this.objCount = jobCardList['odata.count'];
            if (_this.objCount > (_this.pageSize * page)) {
                _this.hasNext = true;
            }
            if (_this.page > 0) {
                _this.hasPrev = true;
            }
            else {
                _this.hasPrev = false;
            }
        }, function (error) {
            console.error(error);
        });
    };
    jobCardListComponent.prototype.JobItemSelected = function (item) {
        this.SelectedJobItem = item;
    };
    jobCardListComponent.prototype.next = function (next) {
        this.page++;
        this.getJobCard(this.page);
    };
    jobCardListComponent.prototype.prev = function (prev) {
        this.page--;
        this.getJobCard(this.page);
    };
    jobCardListComponent = __decorate([
        core_1.Component({
            selector: 'xioma-jobCardList',
            template: "<div class=\"container-fluid jobCard col-sm-12\">\n    <div class=\"row row-sm-height col-sm-12\">\n        <jobCard-master class=\"col-sm-offset-2 col-sm-2 hidden-xs col-sm-height JobCardHeight master\" \n            [jobItems]=\"jobItems\" [HasNext]=\"hasNext\" [HasPrev]=\"hasPrev\"          \n            (selectedUpdate)=\"JobItemSelected($event)\"\n            (GoNext)=\"next($event)\"\n            (GoPrev)=\"prev($event)\">\n        </jobCard-master>\n        <jobCard-detail class=\"col-sm-6 col-xs-12 col-sm-height JobCardHeight\" \n            [jobCardItem]=\"SelectedJobItem\">\n        </jobCard-detail> \n        <div class=\"col-sm-2 hidden-xs col-sm-height JobCardHeight\" ></div>\n    </div>\n</div>\n",
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [JobCard_service_1.JobCardService, login_service_1.LoginService, translate_service_1.TranslateService, router_1.Router])
    ], jobCardListComponent);
    return jobCardListComponent;
}());
exports.jobCardListComponent = jobCardListComponent;
//# sourceMappingURL=jobCard.component.js.map
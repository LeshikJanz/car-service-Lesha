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
var jobCard_service_1 = require("./jobCard.service");
var login_service_1 = require("./login.service");
var router_1 = require("@angular/router");
var translate_service_1 = require("../translate/translate.service");
var jobCardListComponent = (function () {
    function jobCardListComponent(_jobCardService, _loginService, t_service, router, _AR) {
        this._jobCardService = _jobCardService;
        this._loginService = _loginService;
        this.t_service = t_service;
        this.router = router;
        this._AR = _AR;
        this.CLTitle = this.t_service.translate("CHECKLIST");
        this.TRTitle = this.t_service.translate("TIMEREPORTING");
        this.jobItems = [];
        this.page = 0;
        this.hasNext = false;
        this.hasPrev = false;
        this.term = "";
        this.pageSize = 15;
        this.FilterOption = "Open";
    }
    jobCardListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var data = new Map();
        data = this.parseUrl(window.location.href);
        if (data) {
            var barcode = data['barcode'];
            //alert(barcode);
            this.term = barcode;
        }
        if (this.router.url.indexOf("TR") >= 0) {
            this.cheakList = false;
        }
        else {
            this.cheakList = true;
        }
        var page = 0;
        if (this.term == null || this.term == "") {
            this._AR.data
                .subscribe(function (data) {
                _this.jobItems = data.JCData['value'];
                _this.objCount = data.JCData['odata.count'];
                if (_this.objCount > (_this.pageSize * page)) {
                    _this.hasNext = true;
                }
                if (_this.page > 0) {
                    _this.hasPrev = true;
                }
                else {
                    _this.hasPrev = false;
                }
            });
        }
        else {
            this.getJobCard();
        }
    };
    jobCardListComponent.prototype.parseUrl = function (str) {
        var m = new Map();
        var par = str.split('?')[1];
        if (!par) {
            return null;
        }
        var paramList = par.split('&');
        paramList.forEach(function (s) {
            var names = s.split('=');
            m[names[0]] = names[1];
        });
        return m;
    };
    jobCardListComponent.prototype.getJobCard = function (page) {
        if (page === void 0) { page = 0; }
        if (this.cheakList) {
            this.getJobCardCL(page);
        }
        else {
            this.getTimeReport(page);
        }
    };
    jobCardListComponent.prototype.getJobCardCL = function (page) {
        var _this = this;
        if (page === void 0) { page = 0; }
        this._jobCardService.getJobCard(this.term, this.FilterOption, page)
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
    jobCardListComponent.prototype.getTimeReport = function (page) {
        var _this = this;
        if (page === void 0) { page = 0; }
        this._jobCardService.getTimeReport(this.term, this.FilterOption, page)
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
    jobCardListComponent.prototype.Filter = function (opt) {
        this.FilterOption = opt;
        this.getJobCard();
    };
    jobCardListComponent.prototype.search = function (term) {
        this.term = term;
        this.getJobCard();
    };
    return jobCardListComponent;
}());
jobCardListComponent = __decorate([
    core_1.Component({
        selector: 'xioma-jobCardList',
        template: "<div class=\"container-fluid jobCard col-sm-12 jobCard-Container\">\n        <jobCard-master class=\"col-md-3 col-sm-4 hidden-xs col-sm-height JobCardHeight master\" \n            [jobItems]=\"jobItems\" [HasNext]=\"hasNext\" [HasPrev]=\"hasPrev\"      \n            (selectedUpdate)=\"JobItemSelected($event)\" id=\"master\"\n            (GoNext)=\"next($event)\"\n            (GoPrev)=\"prev($event)\"\n            (FilterOpt)=\"Filter($event)\"\n            (searchTerm)=\"search($event)\">\n        </jobCard-master>\n        <jobCard-detail class=\"col-md-9 col-sm-8 col-xs-12 col-sm-height JobCardHeight\" Id=\"detail\" \n            [jobCardItem]=\"SelectedJobItem\">\n        </jobCard-detail> \n</div>\n",
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof jobCard_service_1.JobCardService !== "undefined" && jobCard_service_1.JobCardService) === "function" && _a || Object, typeof (_b = typeof login_service_1.LoginService !== "undefined" && login_service_1.LoginService) === "function" && _b || Object, translate_service_1.TranslateService,
        router_1.Router,
        router_1.ActivatedRoute])
], jobCardListComponent);
exports.jobCardListComponent = jobCardListComponent;
var _a, _b;
//# sourceMappingURL=jobCard.component.js.map
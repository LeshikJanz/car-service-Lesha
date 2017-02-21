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
var router_1 = require('@angular/router');
var login_service_1 = require('./login.service');
var JobCard_service_1 = require('./JobCard.service');
var DashboardComponent = (function () {
    function DashboardComponent(_router, _loginService, _jcService) {
        this._router = _router;
        this._loginService = _loginService;
        this._jcService = _jcService;
        this.storage = sessionStorage;
        this.showAdm = false;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._jcService.getTimeReportingItemsCount()
            .then(function (res) {
            _this.TRItems = res['_body'];
        });
        this._jcService.getCheckListItemsCount()
            .then(function (res) {
            _this.CLItems = res['_body'];
        });
    };
    DashboardComponent.prototype.gotoAdmin = function () {
        this._router.navigate(['admin']);
    };
    DashboardComponent.prototype.gotoJobCard = function (id) {
        //let link = ['/jobCard', id];
        this._router.navigate([('jobCard' + id)]);
        //this._router.navigate(['jobCard']);
    };
    DashboardComponent.prototype.showAdmin = function () {
        this.showAdm = !this.showAdm;
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            templateUrl: 'app/dashboard/dashboard.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, login_service_1.LoginService, JobCard_service_1.JobCardService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map
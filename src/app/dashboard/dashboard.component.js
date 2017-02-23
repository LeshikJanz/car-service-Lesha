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
var router_1 = require("@angular/router");
//import { LoginService } from '../jobCard/login.service';
var jobCard_service_1 = require("../jobCard/jobCard.service");
var loader_service_1 = require("../services/loader.service");
var DashboardComponent = (function () {
    function DashboardComponent(_router, 
        //private _loginService: LoginService,
        _jcService, _AR, _loaderService) {
        this._router = _router;
        this._jcService = _jcService;
        this._AR = _AR;
        this._loaderService = _loaderService;
        this.storage = sessionStorage;
        this.showAdm = false;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._AR.data
            .subscribe(function (data) {
            _this.TRItems = data.TRres['_body'];
            _this.CLItems = data.CLres['_body'];
        });
    };
    DashboardComponent.prototype.gotoAdmin = function () {
        this._router.navigate(['admin']);
    };
    DashboardComponent.prototype.gotoJobCard = function (id) {
        var _this = this;
        // Start application loader.
        this._loaderService.start();
        this._router.navigate([('jobCard' + id)]).then(function (route) {
            // Complete application loader.
            _this._loaderService.complete();
        });
    };
    DashboardComponent.prototype.showAdmin = function () {
        this.showAdm = !this.showAdm;
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'dashboard',
        templateUrl: 'dashboard.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, typeof (_a = typeof jobCard_service_1.JobCardService !== "undefined" && jobCard_service_1.JobCardService) === "function" && _a || Object, router_1.ActivatedRoute,
        loader_service_1.LoaderService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
var _a;
//# sourceMappingURL=dashboard.component.js.map
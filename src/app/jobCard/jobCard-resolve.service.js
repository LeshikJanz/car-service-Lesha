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
var jobCard_service_1 = require("./jobCard.service");
var JobCardResolve = (function () {
    function JobCardResolve(jcs, router) {
        this.jcs = jcs;
        this.router = router;
    }
    JobCardResolve.prototype.resolve = function (route) {
        if (this.router.url.indexOf("TR") < 0) {
            return this.jcs.getJobCard("", "Open", 0).toPromise()
                .then(function (res) {
                return res;
            });
        }
        else {
            return this.jcs.getTimeReport("", "Open", 0).toPromise()
                .then(function (res) {
                return res;
            });
        }
    };
    return JobCardResolve;
}());
JobCardResolve = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof jobCard_service_1.JobCardService !== "undefined" && jobCard_service_1.JobCardService) === "function" && _a || Object, router_1.Router])
], JobCardResolve);
exports.JobCardResolve = JobCardResolve;
var _a;
//# sourceMappingURL=jobCard-resolve.service.js.map
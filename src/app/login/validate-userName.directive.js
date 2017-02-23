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
var forms_1 = require("@angular/forms");
var usersNameEmail_service_1 = require("./usersNameEmail.service");
var vUserName = vUserName_1 = (function () {
    function vUserName(userNameEmailService) {
        this.userNameEmailService = userNameEmailService;
    }
    vUserName.prototype.validate = function (ac) {
        var value = ac.value;
        if (!value) {
            return null;
        }
        value = ac.value.toLowerCase();
        this.userNameEmailService.getUsersNames(value)
            .subscribe(function (users) {
            var a = users;
            ac.setErrors({ vUserName: true });
            return { vUserName: true };
        }, function (error) {
            //console.error(<any>error);
            return null;
        });
        return null;
    };
    return vUserName;
}());
vUserName = vUserName_1 = __decorate([
    core_1.Directive({
        selector: "[vUserName][formControlName],\n  [vUserName][formControl],[vUserName][ngModel]",
        providers: [{
                provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return vUserName_1; }), multi: true
            }]
    }),
    __metadata("design:paramtypes", [usersNameEmail_service_1.UserNameEmailService])
], vUserName);
exports.vUserName = vUserName;
var vUserName_1;
//# sourceMappingURL=validate-userName.directive.js.map
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
var forms_1 = require('@angular/forms');
var usersNameEmail_service_1 = require('./usersNameEmail.service.ts');
var vEmail = (function () {
    function vEmail(userNameEmailService) {
        this.userNameEmailService = userNameEmailService;
    }
    vEmail.prototype.validate = function (ac) {
        var value = ac.value;
        if (!value) {
            return null;
        }
        value = ac.value.toLowerCase();
        this.userNameEmailService.getUsersEmail(value)
            .subscribe(function (users) {
            var a = users;
            ac.setErrors({ vEmail: true });
            return { vEmail: true };
        }, function (error) {
            //console.error(<any>error);
            return null;
        });
        return null;
    };
    vEmail = __decorate([
        core_1.Directive({
            selector: "[vEmail][formControlName],\n  [vEmail][formControl],[vEmail][ngModel]",
            providers: [{
                    provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return vEmail; }), multi: true
                }]
        }), 
        __metadata('design:paramtypes', [usersNameEmail_service_1.UserNameEmailService])
    ], vEmail);
    return vEmail;
}());
exports.vEmail = vEmail;
//# sourceMappingURL=validate-email.directive.js.map
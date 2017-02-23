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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var vEqual = vEqual_1 = (function () {
    function vEqual(vEqual, reflect) {
        this.vEqual = vEqual;
        this.reflect = reflect;
    }
    Object.defineProperty(vEqual.prototype, "isReflect", {
        get: function () {
            if (!this.reflect) {
                return false;
            }
            return this.reflect === 'true' ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    vEqual.prototype.validate = function (ac) {
        var value = ac.value;
        var controlValue = ac.root.get(this.vEqual);
        if (controlValue && value !== controlValue.value
            && !this.isReflect) {
            return { vEqual: true };
        }
        if (controlValue && value === controlValue.value
            && this.isReflect) {
            delete controlValue.errors['vEqual'];
            if (!Object.keys(controlValue.errors).length) {
                controlValue.setErrors(null);
            }
        }
        if (controlValue && value !== controlValue.value
            && this.isReflect) {
            controlValue.setErrors({ vEqual: true });
        }
        return null;
    };
    return vEqual;
}());
vEqual = vEqual_1 = __decorate([
    core_1.Directive({
        selector: "[vEqual][formControlName],\n  [vEqual][formControl],[vEqual][ngModel]",
        providers: [{
                provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return vEqual_1; }), multi: true
            }]
    }),
    __param(0, core_1.Attribute('vEqual')),
    __param(1, core_1.Attribute('reflect')),
    __metadata("design:paramtypes", [String, String])
], vEqual);
exports.vEqual = vEqual;
var vEqual_1;
//# sourceMappingURL=validate-equal.directive.js.map
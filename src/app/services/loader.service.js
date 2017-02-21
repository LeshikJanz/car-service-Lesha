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
(function (LoaderEventType) {
    LoaderEventType[LoaderEventType["VISIBLE"] = 0] = "VISIBLE";
})(exports.LoaderEventType || (exports.LoaderEventType = {}));
var LoaderEventType = exports.LoaderEventType;
var LoaderEvent = (function () {
    function LoaderEvent(type, value) {
        this.type = type;
        this.value = value;
    }
    return LoaderEvent;
}());
exports.LoaderEvent = LoaderEvent;
var LoaderService = (function () {
    function LoaderService() {
        this._visible = true;
        this._eventEmitter = new core_1.EventEmitter();
    }
    Object.defineProperty(LoaderService.prototype, "eventEmitterInstance", {
        /**
         * Event emitter service
         *
         * @readonly
         *
         * @memberOf LoaderService
         */
        get: function () {
            return this._eventEmitter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoaderService.prototype, "visible", {
        /**
         * Setter visible loader.
         *
         *
         * @memberOf LoaderService
         */
        set: function (value) {
            if ('undefined' !== typeof value && null !== value) {
                this._visible = value;
                this.emitEvent(new LoaderEvent(LoaderEventType.VISIBLE, this._visible));
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Fire start loader event.
     *
     *
     * @memberOf LoaderService
     */
    LoaderService.prototype.start = function () {
        // Make it visible for sure.
        this.visible = true;
    };
    /**
     * Complete loader event.
     *
     *
     * @memberOf LoaderService
     */
    LoaderService.prototype.complete = function () {
        this.visible = false;
    };
    /**
     * Fire event.
     *
     * @private
     * @param {LoaderEvent} event
     * @returns
     *
     * @memberOf LoaderService
     */
    LoaderService.prototype.emitEvent = function (event) {
        if (!this._eventEmitter) {
            console.debug('Event emitter is not defined!');
            return;
        }
        this._eventEmitter.next(event);
    };
    LoaderService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LoaderService);
    return LoaderService;
}());
exports.LoaderService = LoaderService;
//# sourceMappingURL=loader.service.js.map
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
var translate_service_1 = require("./translate/translate.service");
var account_service_1 = require("./login/account.service");
var router_1 = require("@angular/router");
var login_service_1 = require("./jobCard/services/login.service");
var LoadConfig_1 = require("./login/LoadConfig");
var jobCard_service_1 = require("./jobCard/services/jobCard.service");
require("../../public/app.css");
var AppComponent = (function () {
    function AppComponent(_translate, _accountService, _router, _XISloginService, loadConfigService, jobCardService) {
        this._translate = _translate;
        this._accountService = _accountService;
        this._router = _router;
        this._XISloginService = _XISloginService;
        this.loadConfigService = loadConfigService;
        this.jobCardService = jobCardService;
        this.pageTitle = "Xioma Web App";
        this.storage = sessionStorage;
    }
    AppComponent.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    AppComponent.prototype.parseUrl = function (str) {
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
    AppComponent.prototype.ngOnInit = function () {
        // let data = new Map<string, string>();
        // data = this.parseUrl(window.location.href);
        // if(data){
        //     let barcode: string = data['barcode'];
        var _this = this;
        //     alert(barcode);
        // }
        sessionStorage.setItem("SapDB", "SWEETWOKXX");
        //sessionStorage.setItem("SapDB", "PRODUCTIONTEST");
        //this.jobCardService.UrlSetter();
        this.subscribeToLangChanged();
        this._translate.setDefaultLang('en');
        this._translate.enableFallback(true);
        this.supportedLanguages = [
            { display: 'English', value: 'en' },
            { display: 'German', value: 'de' }
        ];
        this.selectLang('en');
        if (sessionStorage.getItem('User') == null) {
            sessionStorage.setItem('User', 'guest');
        }
        this.loadConfigService.loadData().then(function (res) {
            var v = JSON.parse(res['_body']);
            while (v.UserServiceIp == null || v.UserServiceIp == "") {
                _this.sleep(500);
            }
            _this.loadConfigService.setParam(v);
            _this.jobCardService.UrlSetter();
        });
    };
    AppComponent.prototype.isCurrentLang = function (lang) {
        return lang === this._translate.currentLang;
    };
    AppComponent.prototype.selectLang = function (lang) {
        this._translate.use(lang);
    };
    AppComponent.prototype.refreshText = function () {
        this.translatedText = this._translate.instant('hello world');
    };
    AppComponent.prototype.subscribeToLangChanged = function () {
        var _this = this;
        return this._translate.onLangChanged.subscribe(function (x) { return _this.refreshText(); });
    };
    AppComponent.prototype.openSub = function (event) {
        var n = document.querySelector('#subMen');
        if (n.classList.contains('dropdown-menu')) {
            n.classList.remove('dropdown-menu');
        }
        else {
            n.classList.add('dropdown-menu');
        }
        //var a = event.target.parentElement;
        if (!event.target.classList.contains('lang')) {
            event.stopPropagation();
        }
    };
    AppComponent.prototype.logout = function () {
        var res = this._accountService.logout()
            .subscribe(function (res) {
            sessionStorage.setItem('User', 'guest');
            sessionStorage.removeItem('Role');
            sessionStorage.removeItem('DepCode');
            sessionStorage.removeItem('EmpID');
            sessionStorage.removeItem('SapDataBase');
        }, function (error) {
        });
        this._XISloginService.logout().subscribe(function (res) {
            var r = res;
        }, function (error) {
        });
        this._router.navigate(['login']);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app.component.html',
        styleUrls: ['./app.component.css']
    }),
    __metadata("design:paramtypes", [translate_service_1.TranslateService,
        account_service_1.AccountService,
        router_1.Router,
        login_service_1.LoginService,
        LoadConfig_1.LoadConfigService,
        jobCard_service_1.JobCardService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var forms_1 = require("@angular/forms");
var app_routing_1 = require("./app.routing");
var router_1 = require("@angular/router");
require("../rxjs-extensions");
var jobCard_service_1 = require("./jobCard/jobCard.service");
var login_service_1 = require("./jobCard/login.service");
var jobCard_component_1 = require("./jobCard/jobCard.component");
var account_service_1 = require("./login/account.service");
var login_component_1 = require("./login/login.component");
var translate_pipe_1 = require("./translate/translate.pipe");
var translate_service_1 = require("./translate/translate.service");
var translation_1 = require("./translate/translation");
var userInfo_service_1 = require("./login/userInfo.service");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var register_component_1 = require("./login/register.component");
var admin_component_1 = require("./login/admin.component");
var roles_component_1 = require("./login/roles.component");
var validate_equal_directive_1 = require("./login/validate-equal.directive");
var validate_userName_directive_1 = require("./login/validate-userName.directive");
var validate_email_directive_1 = require("./login/validate-email.directive");
var usersNameEmail_service_1 = require("./login/usersNameEmail.service");
var user_search_component_1 = require("./login/user-search.component");
var tab_1 = require("./shared/tab");
var tabContainer_1 = require("./shared/tabContainer");
var jobCardMaster_1 = require("./jobCard/jobCardMaster");
var jobCardDetail_1 = require("./jobCard/jobCardDetail");
var checkList_1 = require("./jobCard/checkList");
var timeReport_1 = require("./jobCard/timeReport");
var LoadConfig_1 = require("./login/LoadConfig");
var login_guard_service_1 = require("./login/login-guard.service");
var admin_guard_service_1 = require("./login/admin-guard.service");
var dashboardTR_resolve_service_1 = require("./dashboard/dashboardTR-resolve.service");
var dashboardCL_resolve_service_1 = require("./dashboard/dashboardCL-resolve.service");
var jobCard_resolve_service_1 = require("./jobCard/jobCard-resolve.service");
var ng2_file_upload_1 = require("ng2-file-upload");
var picService_1 = require("./jobCard/picService");
var loader_service_1 = require("./services/loader.service");
var loader_component_1 = require("./components/loader/loader.component");
var jobCardStatusLoader_service_1 = require("./services/jobCardStatusLoader.service");
var timeNoSecondsPipe_1 = require("./pipes/timeNoSecondsPipe");
var store_1 = require("@ngrx/store");
var store_devtools_1 = require("@ngrx/store-devtools");
var example_1 = require("./components/example");
var reducer_1 = require("../reducer");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            router_1.RouterModule.forRoot(app_routing_1.appRoutes, { useHash: true }),
            http_1.HttpModule,
            store_1.StoreModule.provideStore(reducer_1.default),
            store_devtools_1.StoreDevtoolsModule.instrumentOnlyWithExtension()
        ],
        declarations: [
            app_component_1.AppComponent,
            dashboard_component_1.DashboardComponent,
            jobCard_component_1.jobCardListComponent,
            login_component_1.LoginComponent,
            translate_pipe_1.TranslatePipe,
            register_component_1.RegisterComponent,
            validate_equal_directive_1.vEqual,
            validate_userName_directive_1.vUserName,
            validate_email_directive_1.vEmail,
            admin_component_1.AdminComponent,
            roles_component_1.RolesComponent,
            user_search_component_1.UserSearchComponent,
            tab_1.Tab,
            tabContainer_1.TabsContainer,
            jobCardMaster_1.JobCardMasterComponent,
            jobCardDetail_1.JobCardDetailComponent,
            checkList_1.JobCardCheckListComponent,
            timeReport_1.JobCardTimeReportComponent,
            ng2_file_upload_1.FileSelectDirective,
            loader_component_1.LoaderComponent,
            timeNoSecondsPipe_1.TimeNoSecondsPipe,
            example_1.ExampleComponent
        ],
        providers: [
            jobCard_service_1.JobCardService,
            login_service_1.LoginService,
            account_service_1.AccountService,
            picService_1.picService,
            translate_service_1.TranslateService,
            translation_1.TRANSLATION_PROVIDERS,
            userInfo_service_1.UserInfoService,
            dashboardTR_resolve_service_1.DashboardResolveTR,
            dashboardCL_resolve_service_1.DashboardResolveCL,
            jobCard_resolve_service_1.JobCardResolve,
            usersNameEmail_service_1.UserNameEmailService,
            LoadConfig_1.LoadConfigService,
            login_guard_service_1.LoginGuard,
            admin_guard_service_1.AdminGuard,
            loader_service_1.LoaderService,
            jobCardStatusLoader_service_1.JobCardStatusLoaderService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
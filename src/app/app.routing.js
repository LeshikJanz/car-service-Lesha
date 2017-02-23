"use strict";
var jobCard_component_1 = require("./jobCard/jobCard.component");
var login_component_1 = require("./login/login.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var register_component_1 = require("./login/register.component");
var admin_component_1 = require("./login/admin.component");
var roles_component_1 = require("./login/roles.component");
var login_guard_service_1 = require("./login/login-guard.service");
var admin_guard_service_1 = require("./login/admin-guard.service");
var dashboardTR_resolve_service_1 = require("./dashboard/dashboardTR-resolve.service");
var dashboardCL_resolve_service_1 = require("./dashboard/dashboardCL-resolve.service");
var jobCard_resolve_service_1 = require("./jobCard/jobCard-resolve.service");
var example_1 = require("./components/example");
exports.appRoutes = [
    {
        path: 'login',
        component: login_component_1.LoginComponent,
    },
    {
        path: 'jobCardCL',
        component: jobCard_component_1.jobCardListComponent,
        canActivate: [login_guard_service_1.LoginGuard],
        resolve: {
            JCData: jobCard_resolve_service_1.JobCardResolve
        }
    },
    {
        path: 'jobCardTR',
        component: jobCard_component_1.jobCardListComponent,
        canActivate: [login_guard_service_1.LoginGuard],
        resolve: {
            JCData: jobCard_resolve_service_1.JobCardResolve
        }
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent,
        canActivate: [login_guard_service_1.LoginGuard],
        resolve: {
            TRres: dashboardTR_resolve_service_1.DashboardResolveTR,
            CLres: dashboardCL_resolve_service_1.DashboardResolveCL
        }
    },
    {
        path: 'register',
        component: register_component_1.RegisterComponent,
        canActivate: [login_guard_service_1.LoginGuard, admin_guard_service_1.AdminGuard]
    },
    {
        path: 'admin',
        component: admin_component_1.AdminComponent,
        canActivate: [login_guard_service_1.LoginGuard, admin_guard_service_1.AdminGuard]
    },
    {
        path: 'roles',
        component: roles_component_1.RolesComponent,
        canActivate: [login_guard_service_1.LoginGuard, admin_guard_service_1.AdminGuard]
    },
    {
        path: 'store-example',
        component: example_1.ExampleComponent
    }
];
//export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes); 
//# sourceMappingURL=app.routing.js.map
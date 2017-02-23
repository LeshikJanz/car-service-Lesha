import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { jobCardListComponent } from './jobCard/components/jobCard.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './login/register.component';
import { AdminComponent } from './login/admin.component';
import { RolesComponent } from './login/roles.component';
import { LoginGuard } from './login/login-guard.service';
import { AdminGuard } from './login/admin-guard.service';
import { DashboardResolveTR } from './dashboard/dashboardTR-resolve.service';
import { DashboardResolveCL } from './dashboard/dashboardCL-resolve.service';
import { JobCardResolve } from './jobCard/services/jobCard-resolve.service';
import { ExampleComponent } from './components/example';

export const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'jobCardCL',
        component: jobCardListComponent,
        canActivate: [LoginGuard],
        resolve: {
            JCData: JobCardResolve
        }
    },
    {
        path: 'jobCardTR',
        component: jobCardListComponent,
        canActivate: [LoginGuard],
        resolve: {
            JCData: JobCardResolve
        }
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [LoginGuard],
        resolve: {
           TRres: DashboardResolveTR,
           CLres: DashboardResolveCL
        }
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [LoginGuard, AdminGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [LoginGuard, AdminGuard]
    },
    {
        path: 'roles',
        component: RolesComponent,
        canActivate: [LoginGuard, AdminGuard]
    },
    {
        path: 'store-example',
        component: ExampleComponent
    }
];

//export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
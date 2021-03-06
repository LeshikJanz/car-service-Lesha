import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { appRoutes } from './app.routing';
import { RouterModule } from '@angular/router';
import '../rxjs-extensions';
import { JobCardService } from './jobCard/services/jobCard.service';
import { LoginService } from './jobCard/services/login.service';
import { jobCardListComponent } from './jobCard/components/jobCard.component';
import { AccountService } from './login/account.service';
import { LoginComponent } from './login/login.component';
import { TranslateService } from './translate/translate.service';
import { TRANSLATION_PROVIDERS } from './translate/translation';
import { UserInfoService } from './login/userInfo.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './login/register.component';
import { AdminComponent } from './login/admin.component';
import { RolesComponent } from './login/roles.component';
import { vEqual } from './login/validate-equal.directive';
import { vUserName } from './login/validate-userName.directive';
import { vEmail } from './login/validate-email.directive';
import { UserNameEmailService } from './login/usersNameEmail.service';
import { UserSearchComponent } from './login/user-search.component';
import { Tab } from './shared/tab';
import { TabsContainer } from './shared/tabContainer';
import { JobCardMasterComponent } from './jobCard/components/jobCardMaster';
import { JobCardDetailComponent } from './jobCard/components/jobCardDetail';
import { JobCardCheckListComponent } from './jobCard/components/checkList';
import { JobCardTimeReportComponent } from './jobCard/components/timeReport';
import { LoadConfigService } from './login/LoadConfig';
import { LoginGuard } from './login/login-guard.service';
import { AdminGuard } from './login/admin-guard.service';
import { DashboardResolveTR } from './dashboard/dashboardTR-resolve.service';
import { DashboardResolveCL } from './dashboard/dashboardCL-resolve.service';
import { JobCardResolve } from './jobCard/services/jobCard-resolve.service';
import { FileSelectDirective } from 'ng2-file-upload';
import { picService } from './jobCard/services/picService';
import { LoaderService } from './services/loader.service';
import { LoaderComponent } from './components/loader/loader.component';
import { JobCardStatusLoaderService } from './services/jobCardStatusLoader.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import SharedModule from 'app/modules/Share';
import JobCardModule from './modules/JobCard';

import reducer from '../reducer';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    HttpModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    SharedModule,
    JobCardModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    jobCardListComponent,
    LoginComponent,
    RegisterComponent,
    vEqual,
    vUserName,
    vEmail,
    AdminComponent,
    RolesComponent,
    UserSearchComponent,
    Tab,
    TabsContainer,
    JobCardMasterComponent,
    JobCardDetailComponent,
    JobCardCheckListComponent,
    JobCardTimeReportComponent,
    FileSelectDirective,
    LoaderComponent
  ],
  providers: [
    JobCardService,
    LoginService,
    AccountService,
    picService,
    TranslateService,
    TRANSLATION_PROVIDERS,
    UserInfoService,
    DashboardResolveTR,
    DashboardResolveCL,
    JobCardResolve,
    UserNameEmailService,
    LoadConfigService,
    LoginGuard,
    AdminGuard,
    LoaderService,
    JobCardStatusLoaderService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
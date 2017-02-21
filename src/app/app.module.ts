import { NgModule, Pipe } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { appRoutes } from './app.routing';
import { RouterModule } from '@angular/router';
import '../rxjs-extensions';
import { JobCardService } from './jobCard/services/JobCard';
import { JobCardComponent } from './jobCard/components/JobCard';
import { LoginService } from './jobCard/login.service';
import { AccountService } from './login/account.service';
import { LoginComponent } from './login/login.component';
import { TranslatePipe } from './translate/translate.pipe';
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
import { JobCardMasterComponent } from './jobCard/jobCardMaster';
import { JobCardDetailComponent } from './jobCard/jobCardDetail';
import { JobCardCheckListComponent } from './jobCard/checkList';
import { JobCardTimeReportComponent } from './jobCard/timeReport';
import { LoadConfigService } from './login/LoadConfig';
import { LoginGuard } from './login/login-guard.service';
import { AdminGuard } from './login/admin-guard.service';
import { DashboardResolveTR } from './dashboard/dashboardTR-resolve.service';
import { DashboardResolveCL } from './dashboard/dashboardCL-resolve.service';
import { JobCardResolve } from './jobCard/jobCard-resolve.service';
import { FileSelectDirective } from 'ng2-file-upload';
import { picService } from './jobCard/picService';
import { LoaderService } from './services/loader.service';
import { LoaderComponent } from './components/loader/loader.component';
import { JobCardStatusLoaderService } from './services/jobCardStatusLoader.service';
import { TimeNoSecondsPipe } from './pipes/timeNoSecondsPipe';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ExampleComponent } from './components/example';

import reducer from '../reducer';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    HttpModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    JobCardComponent,
    LoginComponent,
    TranslatePipe,
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
    LoaderComponent,
    TimeNoSecondsPipe,
    ExampleComponent
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
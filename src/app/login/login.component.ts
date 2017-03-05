import { Component, OnInit, Pipe } from '@angular/core';
import { userInfo } from './userInfo';
import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { Iresponse } from './response';
import { LoginService } from '../jobCard/services/login.service';
import { UserInfoService } from './userInfo.service';
import { LoadConfigService } from './LoadConfig';
import { LoaderService } from '../services/loader.service';

@Component({
    selector: 'xioma-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./styles/login.css']
})
export class LoginComponent implements OnInit {
    active = true;
    isLogged: boolean = false;
    messege: string = "";
    rememberMe: boolean;
    userInfo = new userInfo("", "", "");

    errorMessege: string;

    constructor(
        private _router: Router,
        private _accountService: AccountService,
        private userInfoService: UserInfoService,
        private _loginService: LoginService,
        private loadConfigService: LoadConfigService,
        private _loaderService: LoaderService) { }


    ngOnInit(): void {
    }

    // submitLogin(): void {
    //     this.loadConfigService.loadData().then(res => {
    //         let v = JSON.parse(res['_body']);
    //         this.loadConfigService.setParam(v);
    //         this.userInfo.grant_type = "password";
    //         this._accountService.login(this.userInfo)
    //             .subscribe(res => {
    //                 if (res['token_type'] == "bearer") {
    //                     sessionStorage.setItem('User', res['userName']);
    //                     sessionStorage.setItem(res['token_type'], res['access_token']);
    //                     this.userInfoService.getUserInfo()
    //                         .subscribe(res => {
    //                             var respo = res;
    //                             if (respo['Roles'].includes('Admin')) {
    //                                 sessionStorage.setItem('Role', 'Admin');
    //                             }
    //                             sessionStorage.setItem('DepCode', respo['DepCode']);
    //                             sessionStorage.setItem('EmpID', respo['EmpID']);
    //                             sessionStorage.setItem('SapDataBase', respo['SapDataBase']);
    //                         },
    //                         error => {
    //                             this.errorMessege = error;
    //                         });
    //                     this._loginService.login().then(res => {
    //                         this._router.navigate(['dashboard']);
    //                     });
    //                 }
    //             },
    //             error => {
    //                 this.errorMessege = error;
    //             });
    //     });
    // };

    submitLogin(): void {
        this.userInfo.grant_type = "password";

        // Start global application loader.
        this._loaderService.start();

        this._accountService.login(this.userInfo)
            .subscribe(res => {
                if (res['token_type'] == "bearer") {
                    sessionStorage.setItem('User', res['userName']);
                    sessionStorage.setItem(res['token_type'], res['access_token']);
                    this.userInfoService.getUserInfo()
                        .subscribe(res => {
                            var respo = res;
                            if (respo['Roles'].includes('Admin')) {
                                sessionStorage.setItem('Role', 'Admin');
                            }
                            sessionStorage.setItem('DepCode', respo['DepCode']);
                            sessionStorage.setItem('EmpID', respo['EmpID']);
                            sessionStorage.setItem('SapDataBase', respo['SapDataBase']);
                        },
                        error => {
                            this.errorMessege = error;
                        });
                    this._loginService.login().then(res => {
                        this._loginService.companyInfo().then(
                            (res => {
                                sessionStorage.setItem('CompanyName', res['CompanyName']);
                                // Complete global application loader.
                                this._loaderService.complete();

                                this._router.navigate(['dashboard']);
                            })
                        )
                    });
                }
            },
            error => {
                this.errorMessege = error;
            });
    }

    // skip(): void {
    //     sessionStorage.setItem('User', 'guestSkip');
    //     this.loadConfigService.loadData().then(res => {
    //         let v = JSON.parse(res['_body']);
    //         this.loadConfigService.setParam(v);
    //         // this._loginService.login().then(res => {
    //         //     this._router.navigate(['dashboard']);
    //         // });
    //         this._router.navigate(['dashboard']);

    //     });
    // }

  skip(): void {
    // Start global application loader.
    this._loaderService.start();

    sessionStorage.setItem('User', 'guestSkip');
    this._loginService.login().then(res => {
      // Complete global application loader.
      this._loaderService.complete();
      this._router.navigate(['dashboard']);
    }).catch(error => {
      // Complete global application loader.
      this._loaderService.complete();
      console.error('Could not skip authentication => ', error);
    });
  }
}
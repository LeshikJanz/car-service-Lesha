import { Component, OnInit } from '@angular/core';
import { TranslateService } from './translate/translate.service';
import { AccountService } from './login/account.service';
import { Router } from '@angular/router';
import { LoginService } from './jobCard/login.service';
import { LoadConfigService } from './login/LoadConfig';
import { JobCardService } from './jobCard/jobCard.service';
import '../../public/app.css';


@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
    pageTitle: string = "Xioma Web App";
    public translatedText: string;
    public supportedLanguages: any[];
    storage = sessionStorage;
    constructor(private _translate: TranslateService,
        private _accountService: AccountService,
        private _router: Router,
        private _XISloginService: LoginService,
        private loadConfigService: LoadConfigService,
        private jobCardService: JobCardService) {

    }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    parseUrl(str: string): Map<string, string> {
        let m = new Map<string, string>();
        let par: string = str.split('?')[1];
        if (!par) {
            return null;
        }
        let paramList: Array<string> = par.split('&');
        paramList.forEach((s: string) => {
            let names: Array<string> = s.split('=');
            m[names[0]] = names[1];
        })
        return m;
    }
    ngOnInit() {

        // let data = new Map<string, string>();
        // data = this.parseUrl(window.location.href);
        // if(data){
        //     let barcode: string = data['barcode'];

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
            { display: 'German', value: 'de' }];

        this.selectLang('en');

        if (sessionStorage.getItem('User') == null) {
            sessionStorage.setItem('User', 'guest');
        }

        this.loadConfigService.loadData().then(res => {
            let v = JSON.parse(res['_body']);
            while(v.UserServiceIp == null || v.UserServiceIp == ""){
                this.sleep(500);
            }
            this.loadConfigService.setParam(v);
            this.jobCardService.UrlSetter();
        });
    }

    isCurrentLang(lang: string) {
        return lang === this._translate.currentLang;
    }

    selectLang(lang: string) {
        this._translate.use(lang);
    }

    refreshText() {
        this.translatedText = this._translate.instant('hello world');
    }

    subscribeToLangChanged() {
        return this._translate.onLangChanged.subscribe((x: any) => this.refreshText());
    }

    openSub(event: any): void {
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

    }

    logout() {
        var res = this._accountService.logout()
            .subscribe(res => {
                sessionStorage.setItem('User', 'guest');
                sessionStorage.removeItem('Role');
                sessionStorage.removeItem('DepCode');
                sessionStorage.removeItem('EmpID');
                sessionStorage.removeItem('SapDataBase');
            },
            error => {
            });
        this._XISloginService.logout().subscribe(res => {
            var r = res;
        },
            error => {

            });
        this._router.navigate(['login']);

    }
}
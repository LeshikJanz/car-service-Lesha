import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { userInfo } from './userInfo';
import { Iresponse } from './response';
import { userRegister } from './userRegister';

@Injectable()
export class AccountService {
    // private _loginUrl = 'http://52.31.155.217:300/Token';
    // private _userInfoUrl = 'http://52.31.155.217:300/api/Account/UserInfo';
    // private _registerUrl = 'http://52.31.155.217:300/api/Account/Register';
    private myHeaders = new Headers({'Content-Type': 'application/json'});

    private baseUrl: string;
    private _loginUrl: string;
    private _userInfoUrl: string;
    private _registerUrl: string;
    private _logoffUrl: string;

    constructor(private _http: Http){
        
    }
    
    ngOnInit(){
        this.setUrls();
    }

    setUrls() {
        this.baseUrl = sessionStorage.getItem("UserServiceIp");
        //this.baseUrl = 'http://localhost:57939/';
        //this.baseUrl = 'http://52.212.106.164:300/';
        this._loginUrl = this.baseUrl + 'Token';
        this._userInfoUrl = this.baseUrl + 'api/Account/UserInfo';
        this._registerUrl = this.baseUrl + 'api/Account/Register';
        this._logoffUrl = this.baseUrl + 'api/Account/Logout';
    }

    login(userInfo: userInfo): Observable<Iresponse[]> {
        this.setUrls();
        var myHeders = new Headers();
        myHeders.append("Content-Type", "application/x-www-form-urlencoded");

        return this._http.post(this._loginUrl, this.transformRequest(userInfo), { headers:myHeders })
            .map((response: Response) => <Iresponse[]>response.json())
            .catch(this.handleError);
    }
    
    private handleError(error: Response){
            console.error(error);
            return Observable.throw(error.json().error || 'Server error');
    }
    
    private transformRequest(userInfo: userInfo): string{
        var strArr:any[] = [];
        for (var item in userInfo) {
            strArr.push(encodeURIComponent(item) + "=" +
            encodeURIComponent(userInfo[item]));
        }
        return strArr.join("&");
    }

    Register(RegisterForm :userRegister): Observable<Response> {
        var token = sessionStorage.getItem('bearer');
        this.myHeaders = new Headers();
        if (token) {
            this.myHeaders.append('authorization', 'Bearer ' + token);
             this.myHeaders.append('Content-Type', 'application/json');
        }
        return this._http.post(this._registerUrl, RegisterForm, 
        { headers:this.myHeaders }).map((response: Response) => <Response>response)
            .catch(this.handleError);
    }

    private transformRequestReg(RegisterForm: userRegister): string{
        var strArr:any[] = [];
        for (var item in RegisterForm) {
            strArr.push(encodeURIComponent(item) + "=" +
            encodeURIComponent(RegisterForm[item]));
        }
        return strArr.join("&");
    }

    logout(): Observable<Response>{
        var token = sessionStorage.getItem('bearer');
        this.myHeaders = new Headers();
        if (token) {
            this.myHeaders.append('authorization', 'Bearer ' + token);
            //this.myHeaders.append('Content-Type', 'application/json');
        }

        return this._http.post(this._logoffUrl, "",{ headers:this.myHeaders })
            .map((response: Response) => <Response>response)
                .catch(this.handleError);
    }
}
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { userInfo } from './userInfo';
import { Iresponse } from './response';

@Injectable()
export class UserInfoService {
    // private _userInfoUrl = 'http://52.31.155.217:300/api/Account/UserInfo';
    private myHeaders = new Headers();

    private baseUrl: string;
    private _userInfoUrl: string;

    constructor(private _http: Http){
        this.baseUrl = sessionStorage.getItem("UserServiceIp");
        //this.baseUrl = 'http://localhost:57939/';
        this._userInfoUrl = this.baseUrl + 'api/Account/UserInfo';
    }

    getUserInfo(): Observable<any[]> {
        this.baseUrl = sessionStorage.getItem("UserServiceIp");
        this._userInfoUrl = this.baseUrl + 'api/Account/UserInfo';
        var token = sessionStorage.getItem('bearer');
        this.myHeaders = new Headers();
        if (token) {
            this.myHeaders.append('authorization', 'Bearer ' + token);
        }
    
        return this._http.get(this._userInfoUrl, { headers:this.myHeaders })
            .map((response: any) => <any[]>response.json())
            .catch(this.handleError);
    }
    
    private handleError(error: Response){
            console.error(error);
            return Observable.throw(error.json().error || 'Server error');
    }

    // setUrl(){

    // }
}
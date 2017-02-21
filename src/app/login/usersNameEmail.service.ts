import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { userInfo } from './userInfo';
import { Iresponse } from './response';
import { user } from './user';

@Injectable()
export class UserNameEmailService {
    
    private baseUrl: string;
    private userNameUrl: string;
    private userEmailUrl: string;
    private userUrl: string ;
    private myHeaders = new Headers();

    constructor(private _http: Http){
        this.baseUrl = sessionStorage.getItem("UserServiceIp");
        this.userNameUrl = this.baseUrl + 'api/Account/GetUser';
        this.userEmailUrl= this.baseUrl + 'api/Account/GetUsersEmail';
        this.userUrl = this.baseUrl + '/api/Account/GetSearchUsers';

    }

    getUsersNames(userName:string): Observable<any[]> {
        this.adjustHeaders();
        return this._http.get((this.userNameUrl + "(" + userName + ")")
        , { headers:this.myHeaders })
            .map((response: any) => <any[]>response.json());
    }
    
    getUsersEmail(emailDec:string): Observable<string[]> {
        this.adjustHeaders();
        var emailEN = emailDec.split('.').join('~~');
        return this._http.get(this.userEmailUrl + "(" + emailEN + ")"
        , { headers:this.myHeaders })
            .map((response: any) => <string[]>response.json());
    }

    searchUser(term: string): Observable<any[]> {
        this.adjustHeaders();
        return this._http.get(this.userUrl + "(" + term + ")"
        , { headers:this.myHeaders })
        .map((r: any) => r['_body'] as any[]);
        //return null;
    }

    private handleError(error: Response){
        return Observable.throw(error.json().error || 'Server error');
    }

    private adjustHeaders() :void {
        var token = sessionStorage.getItem('bearer');
        this.myHeaders = new Headers();
        if (token) {
            this.myHeaders.append('authorization', 'Bearer ' + token);
        }
    }
}
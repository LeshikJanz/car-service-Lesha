import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Icredentials } from '../interfaces/credentials';

@Injectable()
export class LoginService {
    private _baseUrlSWEETWOKXX = 'https://52.31.210.169:50000/';
    private _baseUrlPRODUCTIONTEST = 'https://10.0.1.43:50004/';
    private _loginUrl = "";
    private _logoutUrl = "";
    private _companyInfoUrl = "";

    loginCredSWEETWOKXX: Icredentials = {
        "CompanyDB": "SWEETWOKXX",
        "UserName": "manager",
        "Password": "123456"
    };

    loginCredPRODUCTIONTEST: Icredentials = {
        "CompanyDB": "PRODUCTIONTEST",
        "UserName": "manager",
        "Password": "123456"
    };

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private _http: Http) {

    }

    // login(): Observable<any[]> {

    //     return this._http.post(this._loginUrl, JSON.stringify(this.loginCred), 
    //     {headers: this.headers, withCredentials:true})
    //         .map((response: Response) => <any[]>response.json())
    //         .catch(this.handleError);

    // }

    login(): Promise<Response> {
        var loginCred = this.getCred();
        
        return new Promise((resolve, reject) => {
            this._http.post(this._loginUrl, JSON.stringify(loginCred),
                { headers: this.headers, withCredentials: true })
                .map((response: Response) => <any[]>response.json())
                .catch(this.handleError)
                .subscribe(data => { resolve(data); },
                error => reject(error));
        });
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    logout(): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this._logoutUrl, "",
            { headers: headers, withCredentials: true })
            .map((response: Response) => {
                return response;
            })
            .catch(this.handleError);
    }

    companyInfo(): Promise<Response> {
        var loginCred = this.getCred();
        return new Promise((resolve, reject) => {
            this._http.post(this._companyInfoUrl, { "company_name": loginCred.CompanyDB },
                { headers: this.headers, withCredentials: true })
                .map((response: Response) => <any[]>response.json())
                .catch(this.handleError)
                .subscribe(data => { resolve(data); },
                error => reject(error));
        });
    }

     getCred() :Icredentials {
        let loginCred = this.loginCredSWEETWOKXX;
        var db = sessionStorage.getItem("SapDB");
        switch (db) {

            case "SWEETWOKXX":
                loginCred = this.loginCredSWEETWOKXX;
                if(this._loginUrl == ""){
                    this._loginUrl = this._baseUrlSWEETWOKXX + 'b1s/v1/Login';
                    this._logoutUrl = this._baseUrlSWEETWOKXX + 'b1s/v1/Logout';
                    this._companyInfoUrl = this._baseUrlSWEETWOKXX + 'b1s/v1/CompanyService_GetCompanyInfo';
                }
                break;
            case "PRODUCTIONTEST":
                loginCred = this.loginCredPRODUCTIONTEST;
                if(this._loginUrl == ""){
                    this._loginUrl = this._baseUrlPRODUCTIONTEST + 'b1s/v1/Login';
                    this._logoutUrl = this._baseUrlPRODUCTIONTEST + 'b1s/v1/Logout';
                    this._companyInfoUrl = this._baseUrlPRODUCTIONTEST + 'b1s/v1/CompanyService_GetCompanyInfo';
                }
                break;
            default:
                loginCred = this.loginCredSWEETWOKXX;

        }
        return loginCred;
    }

    
}
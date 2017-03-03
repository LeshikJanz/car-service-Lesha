import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { U_XIS_JOBSTTS } from '../classes/U_XIS_JOBSTTS';

@Injectable()
export class JobCardStatusLoaderService {
    
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private sttsCollection: U_XIS_JOBSTTS[];
    constructor(private http: Http) {
        this.sttsCollection = new Array<U_XIS_JOBSTTS>();
    }

    public loadStatuses() : U_XIS_JOBSTTS[]{
        let jobCardUrlBase = "";
        var db = sessionStorage.getItem("SapDB");
        switch (db) {
            case "SWEETWOKXX":
                jobCardUrlBase = 'https://52.213.80.73:50000/b1s/v1/U_XIS_JOBSTTS';
                break;
            case "PRODUCTIONTEST":
                jobCardUrlBase = 'https://10.0.1.43:50004/b1s/v1/U_XIS_JOBSTTS';
                break;
            default:
        }
        let countUrl = jobCardUrlBase + '/$count?';
        let count = 0;
        this.sttsCount(countUrl).then(res => {
            count = res;
            let jobCardUrl = jobCardUrlBase;
            let skip = 0;
            do{
                jobCardUrl = jobCardUrlBase + `?$skip=${skip}`;
                this.request(jobCardUrl).subscribe(res => {
                    (res['value'] as U_XIS_JOBSTTS[]).forEach(element => {            
                        this.sttsCollection.push(element);
                        });
                },
                error => 
                {
                    console.error(<any>error);
                });
                skip += 20;
            }
            while(skip < count);
        });

        return this.sttsCollection;
        
    }

    private request(jobCardUrl: string):  Observable<any[]>{
            return this.http.get(jobCardUrl, {
                headers: this.headers,
                withCredentials: true
                }).map((response: Response) => <any[]>response.json())
                .catch(this.handleError); 
    }

    private sttsCount(url: string): Promise<number>{
        return new Promise((resolve, reject) => {
            this.http.get(url, {
            headers: this.headers,
            withCredentials: true
            }).map((response: Response) => <any[]>response.json())
                .catch(this.handleError)
                .subscribe(data => {
                    resolve(data);
                },
                error => reject(error));
        });
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
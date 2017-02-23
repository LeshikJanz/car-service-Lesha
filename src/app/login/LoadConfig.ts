import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoadConfigService {
    private configUrl = '../../public/config.json';
    //private configUrl = 'config.json';
    valueOut: any;
    constructor(private http: Http) {

    }
    
    loadData(): Promise<Response>{
        return new Promise((resolve, reject) => {
            this.http.get(this.configUrl)
            .map(response => response)
            .subscribe(data => {
                resolve(data);
                },
                error => reject(error));
        });
    }
    load(): void{
        this.loadData().then(res => {
            this.valueOut = JSON.parse(res['_body']);
            var value = this.valueOut;
            sessionStorage.setItem("JobCardStatusClose",value.JobCardStatusClose);
            sessionStorage.setItem("CheckListStatusOpen",value.CheckListStatusOpen);
            sessionStorage.setItem("JobCardSort1",value.JobCardSort1);
            sessionStorage.setItem("JobCardSort2",value.JobCardSort2);
            sessionStorage.setItem("TimeReportingStatusOpen",value.TimeReportingStatusOpen);
            sessionStorage.setItem("Vi icon",value.Viicon);
            sessionStorage.setItem("X icon",value.Xicon);
            sessionStorage.setItem("? icon",value.Qicon);
            sessionStorage.setItem("MaxRecordForJobCardPage",value.MaxRecordForJobCardPage);
            sessionStorage.setItem("UserServiceIp",value.UserServiceIp);
        });
    }

    setParam(value: any):void{
            sessionStorage.setItem("JobCardStatusClose",value.JobCardStatusClose);
            sessionStorage.setItem("CheckListStatusOpen",value.CheckListStatusOpen);
            sessionStorage.setItem("JobCardSort1",value.JobCardSort1);
            sessionStorage.setItem("JobCardSort2",value.JobCardSort2);
            sessionStorage.setItem("TimeReportingStatusOpen",value.TimeReportingStatusOpen);
            sessionStorage.setItem("Vi icon",value.Viicon);
            sessionStorage.setItem("X icon",value.Xicon);
            sessionStorage.setItem("? icon",value.Qicon);
            sessionStorage.setItem("MaxRecordForJobCardPage",value.MaxRecordForJobCardPage);
            sessionStorage.setItem("UserServiceIp",value.UserServiceIp);
    }
}
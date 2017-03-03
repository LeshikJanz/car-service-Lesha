import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { XIS_JOBS9Collection } from '../variables/XIS_JOBS9Collection';
import { XIS_JOBS11Collection } from '../variables/XIS_JOBS11Collection';


@Injectable()
export class JobCardService {

    //private _baseUrlSWEETWOKXX = 'https://52.31.210.169:50000/';
    //private _baseUrlPRODUCTIONTEST = 'https://10.0.1.43:50004/';
    private _jobCardUrl = "";

    ret: any;
    private headers = new Headers({ 'Content-Type': 'application/json' });
    sttsAll: string;
    sttsOpen: string;
    sttsClose: string;

    constructor(private http: Http) {
        // var AllCloseStts = sessionStorage.getItem('JobCardStatusClose');
        // this.sttsAll = '';
        // //this.sttsOpen = 'and Status ne';
        // var SttsArr = AllCloseStts.split(',');
        // this.sttsOpen = " ";
        // this.sttsClose = "and (";
        // SttsArr.forEach(element => {
        //     this.sttsOpen += "and U_Status ne '" + element + "'";
        //     this.sttsClose += "U_Status eq '" + element + "' or ";
        // });

        // this.sttsClose += ")";
        // this.sttsClose = this.sttsClose.replace("or )", ")");
    }

    getJobCard(term: string, FilterOption: string, page: number = 0): Observable<any[]> {
        var EmpId = sessionStorage.getItem("EmpID");
        //EmpId = null;
        var pageSize = 15;
        var skip = page * pageSize;
        var firstOrder = sessionStorage.getItem('JobCardSort1');
        var secondOrder = sessionStorage.getItem('JobCardSort2');
        var currentFilterOption = this.filterOptionSelector(FilterOption);
        var search = this.buildSearchString(term);
        var innerUrl = this._jobCardUrl.concat(`?$filter=${search}(U_JCManager eq '${EmpId}' 
            or U_SerCons eq '${EmpId}')${currentFilterOption}&$inlinecount=allpages
            &$orderby=${firstOrder},${secondOrder}&$top=${pageSize}&$skip=${skip}`);
        return this.http.get(innerUrl, {
            headers: this.headers,
            withCredentials: true
        })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);

    }

    getTimeReport(term: string, FilterOption: string, page: number = 0): Observable<any[]> {
        var EmpId = sessionStorage.getItem("EmpID");
        //EmpId = null;
        var DepCode = sessionStorage.getItem("DepCode");
        //DepCode = '1';
        var pageSize = 15;
        var skip = page * pageSize;
        var firstOrder = sessionStorage.getItem('JobCardSort1');
        var secondOrder = sessionStorage.getItem('JobCardSort2');
        var currentFilterOption = this.filterOptionSelector(FilterOption);
        var search = this.buildSearchString(term);
        var innerUrl = this._jobCardUrl.concat(`?$filter=${search}(U_JCManager eq '${EmpId}' 
            or U_SerCons eq '${EmpId}' or U_Dep eq '${DepCode}')${currentFilterOption}&$inlinecount=allpages
            &$orderby=${firstOrder},${secondOrder}&$top=${pageSize}&$skip=${skip}`);
        return this.http.get(innerUrl, {
            headers: this.headers,
            withCredentials: true
        })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);

    }

    getTimeReportingItemsCount(): Promise<Response> {
        var EmpId = sessionStorage.getItem("EmpID");
        //EmpId = null;
        var DepCpde = sessionStorage.getItem("DepCode");
        //DepCpde = '1';
        var innerUrl = this._jobCardUrl.concat(`/$count?$filter=(U_JCManager eq '${EmpId}' 
            or U_SerCons eq '${EmpId}' or U_Dep eq '${DepCpde}')${this.sttsOpen}`);

        return new Promise((resolve, reject) => {
            this.http.get(innerUrl, {
                headers: this.headers,
                withCredentials: true
            })
                .map(response => response)
                .catch(this.handleError)
                .subscribe(data => {
                    resolve(data);
                },
                error => reject(error));
        });
    }

    getCheckListItemsCount(): Promise<Response> {
        var EmpId = sessionStorage.getItem("EmpID");
        //EmpId = null;
        var DepCpde = sessionStorage.getItem("DepCode");
        //DepCpde = '1';
        var innerUrl = this._jobCardUrl.concat(`/$count?$filter=(U_JCManager eq '${EmpId}' 
            or U_SerCons eq '${EmpId}')${this.sttsOpen}`);

        return new Promise((resolve, reject) => {
            this.http.get(innerUrl, {
                headers: this.headers,
                withCredentials: true
            })
                .map(response => response)
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

    postjob9(item: XIS_JOBS9Collection) {
        let opts: RequestOptionsArgs = {
            headers: this.headers,
            withCredentials: true
        };

        let body = {
            "XIS_JOBS9Collection": [{
                "LineId": item.LineId,
                "U_TaskStts": item.U_TaskStts,
                "U_Notes": item.U_Notes,
                "U_RsrcCode": item.U_RsrcCode,
                "U_StrtDate": item.U_StrtDate,
                "U_StrtHour": item.U_StrtHour,
                "U_Source": item.U_Source,
                "U_Attach": item.U_Attach
            }]
        };
        var innerUrl = this._jobCardUrl.concat(`(${item.DocEntry})`);

        return this.http.patch(innerUrl, body, opts)
            .map((response: Response) => response)
            .catch(this.handleError);

    }

    postjob11(item: XIS_JOBS11Collection) {
        let opts: RequestOptionsArgs = {
            headers: this.headers,
            withCredentials: true
        };

        let body = {
            "XIS_JOBS11Collection": [{
                "LineId": item.LineId,
                "U_JobLine": item.U_JobLine,
                "U_EMPID": item.U_EMPID,
                "U_RprtType": item.U_RprtType,
                "U_FromDt": item.U_FromDt,
                "U_FromHr": item.U_FromHr,
                "U_ToHr": item.U_ToHr,
                "U_TotalHrs": item.U_TotalHrs,
            }]
        };
        var innerUrl = this._jobCardUrl.concat(`(${item.DocEntry})`);

        return this.http.patch(innerUrl, body, opts)
            .map((response: Response) => response)
            .catch(this.handleError);

    }

    postJob(item: any){
        let opts: RequestOptionsArgs = {
            headers: this.headers,
            withCredentials: true
        };
        const body = item;

        var innerUrl = this._jobCardUrl.concat(`(${item.DocEntry})`);

        return this.http.patch(innerUrl, body, opts)
          .map((response: Response) => response)
          .catch(this.handleError);
    }

    filterOptionSelector(FilterOption: string) {
        this.UrlSetter();
        if (FilterOption == 'Open') {
            return this.sttsOpen;
        } else {
            if (FilterOption == 'Close') {
                return this.sttsClose;
            } else {
                return this.sttsAll;
            }
        }
    }

    buildSearchString(term: string): string {
        if (term == "") {
            return "";
        }
        else {
            let str = `(contains(DocNum, '${term}') or contains(U_CarID, '${term}') 
            or contains(U_OwnBP, '${term}') or contains(U_OwnBPN, '${term}') 
            or contains(U_OwnCnt, '${term}') or contains(U_OwnCntPh, '${term}') 
            or contains(U_SpnsrBP, '${term}') or contains(U_SpnsrBPN, '${term}') 
            or contains(U_SpnCntPh, '${term}') or contains(U_MdlCode, '${term}') 
            or contains(U_VCode, '${term}') or contains(U_LicNum, '${term}')) and `;
            return str;
        }
    }

    UrlSetter() {
        if (this._jobCardUrl == "") {
            var db = sessionStorage.getItem("SapDB");
            switch (db) {
                case "SWEETWOKXX":
                    this._jobCardUrl = 'https://52.31.210.169:50000/b1s/v1/XIS_Jbs_UO';
                    break;
                case "PRODUCTIONTEST":
                    this._jobCardUrl = 'https://10.0.1.43:50004/b1s/v1/XIS_Jbs_UO';
                    break;
                default:
            }

            var AllCloseStts = sessionStorage.getItem('JobCardStatusClose');
            if(AllCloseStts){
                this.sttsAll = '';
                //this.sttsOpen = 'and Status ne';
                var SttsArr = AllCloseStts.split(',');
                this.sttsOpen = " ";
                this.sttsClose = "and (";
                SttsArr.forEach(element => {
                    this.sttsOpen += "and U_Status ne '" + element + "'";
                    this.sttsClose += "U_Status eq '" + element + "' or ";
                });

                this.sttsClose += ")";
                this.sttsClose = this.sttsClose.replace("or )", ")");
            }
        }
    }
}
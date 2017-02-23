import { Injectable, } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Response, Headers, Http } from '@angular/http';
import {
  Router,
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';

import { setItems } from '../actions';

@Injectable()
export class JobCardResolve implements Resolve<Response> {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private _jobCardUrl = '';

  page$: number;
  pageSize$: number;
  filter$: string;

  sttsAll: string;
  sttsOpen: string;
  sttsClose: string;

  constructor(
    private router: Router,
    private http: Http,
    private store: Store<any>
  ) {
    store
      .select('JobCard')
      .subscribe(
        (state: any) => {
          this.pageSize$ = state.page.size;
          this.page$ = state.page.number;
          this.filter$ = state.page.filter;
        }
      )
  }

  getJobCard(term: string = ''): Promise<any> {
    return this.http
      .get(this.url(term), {
        headers: this.headers,
        withCredentials: true
      })
      .map((response: Response) => <any[]>response.json())
      .toPromise()
      .then(
        result => this.store.dispatch(setItems(result))
      )
      .catch(this.handleError);
  }

  url(term: string) {
    const EmpId = sessionStorage.getItem("EmpID");
    const firstOrder = sessionStorage.getItem('JobCardSort1');
    const secondOrder = sessionStorage.getItem('JobCardSort2');
    const DepCode = sessionStorage.getItem("DepCode");
    const currentFilterOption = this.filterOptionSelector();
    const search = this.buildSearchString(term);

    return this._jobCardUrl.concat(`?$filter=${search}(U_JCManager eq '${EmpId}' 
            or U_SerCons eq '${EmpId}')${currentFilterOption}&$inlinecount=allpages
            &$orderby=${firstOrder},${secondOrder}&$top=${this.pageSize$}&$skip=${this.page$ * this.pageSize$}`);
  }

  buildSearchString(term: string): string {
    if (!term.length) return term;

    return `(contains(DocNum, '${term}') or contains(U_CarID, '${term}') 
            or contains(U_OwnBP, '${term}') or contains(U_OwnBPN, '${term}') 
            or contains(U_OwnCnt, '${term}') or contains(U_OwnCntPh, '${term}') 
            or contains(U_SpnsrBP, '${term}') or contains(U_SpnsrBPN, '${term}') 
            or contains(U_SpnCntPh, '${term}') or contains(U_MdlCode, '${term}') 
            or contains(U_VCode, '${term}') or contains(U_LicNum, '${term}')) and `;
  }

  filterOptionSelector() {
    this.UrlSetter();

    switch (this.filter$) {
      case 'Open':
        return this.sttsOpen;

      case 'Close':
        return this.sttsClose;

      default:
        return this.sttsAll;
    }
  }

  UrlSetter() {
    if (!this._jobCardUrl.length) {
      const db = sessionStorage.getItem("SapDB");
      switch (db) {
        case "SWEETWOKXX":
          this._jobCardUrl = 'https://52.31.210.169:50000/b1s/v1/XIS_Jbs_UO';
          break;
        case "PRODUCTIONTEST":
          this._jobCardUrl = 'https://10.0.1.43:50004/b1s/v1/XIS_Jbs_UO';
          break;
        default:
      }

      const AllCloseStts = sessionStorage.getItem('JobCardStatusClose');
      if (AllCloseStts) {
        this.sttsAll = '';
        const SttsArr = AllCloseStts.split(',');
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

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this.getJobCard();
  }

}

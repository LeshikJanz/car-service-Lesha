import { Injectable, } from '@angular/core';
import {Router, Resolve,
    ActivatedRouteSnapshot } from '@angular/router';
import { Response } from '@angular/http';
import { JobCardService } from './jobCard.service';

@Injectable()
export class JobCardResolve implements Resolve<Response> {
    constructor(private jcs: JobCardService, private router: Router) {

    }

    resolve(route: ActivatedRouteSnapshot): Promise<any> {
        if(this.router.url.indexOf("TR") < 0 ){
            return this.jcs.getJobCard("", "Open", 0).toPromise()
            .then(res => {
                return res;
            })
        }
        else{
            return this.jcs.getTimeReport("", "Open", 0).toPromise()
            .then(res => {
                return res;
            })
        }
    }
}
import { Injectable, } from '@angular/core';
import {Router, Resolve,
    ActivatedRouteSnapshot } from '@angular/router';
import { Response } from '@angular/http';
import { JobCardService } from '../jobCard/services/JobCard';

@Injectable()
export class DashboardResolveTR implements Resolve<Response> {
    constructor(private jcs: JobCardService, private router: Router) {

    }

    resolve(route: ActivatedRouteSnapshot): Promise<Response> {
         return this.jcs.getTimeReportingItemsCount()
            .then(res => {
                return res;
            });
    }
}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { JobCardService } from '../jobCard/services/JobCard';
import { LoaderService } from '../services/loader.service';
import { Response } from '@angular/http';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

    storage = sessionStorage;
    showAdm = false;
    TRItems: number;
    CLItems: number;
    private dirInfo: any;

    constructor( 
    private _router: Router,
    //private _loginService: LoginService,
    private _jcService: JobCardService,
    private _AR: ActivatedRoute,
    private _loaderService: LoaderService
    ){       

    }

    ngOnInit():void {  
        this._AR.data
        .subscribe((data: { TRres: Response, CLres: Response }) => {
            this.TRItems = data.TRres['_body'];
            this.CLItems = data.CLres['_body'];
        });
    }

    gotoAdmin(): void{
        this._router.navigate(['admin']);
    }

    gotoJobCard(id: string): void {
        // Start application loader.
        this._loaderService.start();
        
        this._router.navigate([('jobCard' + id)]).then(route => {
            // Complete application loader.
            this._loaderService.complete();
        });
    }
    
    showAdmin(): void {
        this.showAdm = ! this.showAdm;
    }
}
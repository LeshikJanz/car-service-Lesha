import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JobCardService } from '../services/jobCard.service';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '../../translate/translate.service';
import { JobCard } from '../variables/jobCard';

@Component({
    selector: 'xioma-jobCardList',
    template:`<div class="container-fluid jobCard col-sm-12 jobCard-Container">
        <jobCard-master class="col-md-3 col-sm-4 hidden-xs col-sm-height JobCardHeight master" 
            [jobItems]="jobItems" [HasNext]="hasNext" [HasPrev]="hasPrev"      
            (selectedUpdate)="JobItemSelected($event)" id="master"
            (GoNext)="next($event)"
            (GoPrev)="prev($event)" 
            (FilterOpt)="Filter($event)"
            (searchTerm)="search($event)">
        </jobCard-master>
        <jobCard-detail class="col-md-9 col-sm-8 col-xs-12 col-sm-height JobCardHeight" Id="detail" 
            [jobCardItem]="SelectedJobItem">
        </jobCard-detail> 
</div>
`,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../styles/jobCard.css']

})

export class jobCardListComponent implements OnInit{
    cheakList: boolean;
    CLTitle: string = this.t_service.translate("CHECKLIST");
    TRTitle: string = this.t_service.translate("TIMEREPORTING");
    jobItems: JobCard[] = [];
    SelectedJobItem: any;
    objCount: number;
    page: number = 0;
    pageSize: number;
    hasNext: boolean = false;
    hasPrev: boolean = false;

    term: string = ""; 
    FilterOption: string;

    constructor(private _jobCardService: JobCardService, 
        private _loginService: LoginService,
        private t_service: TranslateService,
        private router: Router,
        private _AR: ActivatedRoute){
        this.pageSize = 15;
        this.FilterOption = "Open";
    }
    
    
    ngOnInit(): void {

        let data = new Map<string, string>();
        data = this.parseUrl(window.location.href);
        if (data) {
            let barcode: string = data['barcode'];

            //alert(barcode);
            this.term = barcode;
        }

        if (this.router.url.indexOf("TR") >= 0 ) {
            this.cheakList = false;
        }
        else {
            this.cheakList = true;
        }

        let page = 0;
        if (this.term == null || this.term == "") {
            this._AR.data
                .subscribe((data: { JCData: any }) => {
                    this.jobItems = data.JCData['value'];
                    this.objCount = data.JCData['odata.count'];
                    if (this.objCount > (this.pageSize * page)) {
                        this.hasNext = true;
                    }
                    if (this.page > 0) {
                        this.hasPrev = true;
                    }
                    else {
                        this.hasPrev = false;
                    }
                });
        }
        else{
            this.getJobCard();
        }
    }

    parseUrl(str: string): Map<string, string> {
        let m = new Map<string, string>();
        let par: string = str.split('?')[1];
        if (!par) {
            return null;
        }
        let paramList: Array<string> = par.split('&');
        paramList.forEach((s: string) => {
            let names: Array<string> = s.split('=');
            m[names[0]] = names[1];
        })
        return m;
    }
    
    getJobCard(page: number = 0){
        if(this.cheakList){
            this.getJobCardCL(page);
        }
        else{
            this.getTimeReport(page);
        }
    }
    getJobCardCL(page: number = 0){
         this._jobCardService.getJobCard(this.term, this.FilterOption, page)
            .subscribe(jobCardList => 
            {
                this.jobItems = jobCardList['value'];
                this.objCount = jobCardList['odata.count'];
                if(this.objCount > (this.pageSize * page)){
                    this.hasNext = true;
                }
                if(this.page > 0){
                    this.hasPrev = true;
                }
                else{
                    this.hasPrev = false;
                }
            },
            error => 
            {
                console.error(<any>error);
            });
    }

    getTimeReport(page: number = 0){
         this._jobCardService.getTimeReport(this.term, this.FilterOption, page)
            .subscribe(jobCardList => 
            {
                this.jobItems = jobCardList['value'];
                this.objCount = jobCardList['odata.count'];
                if(this.objCount > (this.pageSize * page)){
                    this.hasNext = true;
                }
                if(this.page > 0){
                    this.hasPrev = true;
                }
                else{
                    this.hasPrev = false;
                }
            },
            error => 
            {
                console.error(<any>error);
            });
    }

    JobItemSelected(item: JobCard){
        this.SelectedJobItem = item;
    }

    next(next: string){
        this.page++;
        this.getJobCard(this.page);  
    }

    prev(prev: string){
        this.page--;
        this.getJobCard(this.page);
    }

    Filter(opt: string){
        this.FilterOption = opt;
        this.getJobCard();
    }

    search(term: string){
        this.term = term;
        this.getJobCard();
    }
}
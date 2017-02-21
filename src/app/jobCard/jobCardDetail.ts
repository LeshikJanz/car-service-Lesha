import {Component, Input, Output, EventEmitter, OnChanges, OnInit} from '@angular/core'
import { JobCard } from './jobCard';
import { XIS_JOBS9Collection } from './XIS_JOBS9Collection';
import { Router } from '@angular/router';
import { JobCardStatusLoaderService} from '../services/jobCardStatusLoader.service';
import { U_XIS_JOBSTTS } from '../classes/U_XIS_JOBSTTS';

@Component({
  selector: 'jobCard-detail',
  templateUrl: 'jobCardDetail.html'
})
export class JobCardDetailComponent implements OnChanges, OnInit {
  selected: string;
  cheakList: boolean;
  @Input() jobCardItem: JobCard
  sttsCollection : U_XIS_JOBSTTS[];

  constructor(private router: Router,
    private JCSttsService: JobCardStatusLoaderService){

  }
  ngOnChanges(): void {
    if(!this.sttsCollection){
      this.sttsCollection = this.JCSttsService.loadStatuses();
    }
    
    if(this.jobCardItem && this.sttsCollection.length > 0){
      this.jobCardItem.sttsDesc = this.sttsCollection.filter
        (x => x.Code == this.jobCardItem['U_Status'])[0].U_TypeDesc;
    }
    else{
      if(this.jobCardItem){
        this.jobCardItem.sttsDesc = "Neuer Auftrag";
      }
    }
    if(!this.jobCardItem){
      this.slideIn();
    }
   
  }
  
  ngOnInit(): void {
    if(this.router.url.indexOf("TR") >= 0 ){
            this.cheakList = false;
            this.selected = "TR";
        }
        else{
            this.cheakList = true;
            this.selected = "CL";
        }
  }
  
  selectTab(event: any){
    var target = event.currentTarget;
    if(target.attributes.id.nodeValue === "CL"){
      this.selected = "CL";
    }
    else{
      if(target.attributes.id.nodeValue === "TR"){
        this.selected = "TR";
      }
      else{
        this.selected = "GL";
      }
    }
  }

  isSelected(name: string): boolean {
    return this.selected === name;
  }

  slideIn(): void{
    var master = document.querySelector('#master');
    master.classList.remove("hidden-xs");
    master.classList.add("col-xs-12");
    var detail = document.querySelector('#detail');
    detail.classList.remove("col-xs-12");
    detail.classList.add("hidden-xs");
  }

  sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

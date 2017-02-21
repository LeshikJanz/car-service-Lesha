import {Component, Input, OnChanges, OnInit } from '@angular/core';
import { XIS_JOBS9Collection } from './XIS_JOBS9Collection';
import { picService } from './picService';


//import { FileUploader } from 'ng2-file-upload'; 

@Component({
    selector: 'jobCard-cheackList',
    templateUrl: 'checkList.html'
})

export class JobCardCheckListComponent implements OnChanges, OnInit {

    @Input() checkListItems: XIS_JOBS9Collection[];
    selected: XIS_JOBS9Collection;
    commentActive: boolean = false;
    value0: string;
    value1: string;
    value2: string;

    constructor(private picService: picService) {
    }

    ngOnInit(): void{
        this.value0 = sessionStorage.getItem('Xicon');
        this.value1 = sessionStorage.getItem('Viicon');
        this.value2 = sessionStorage.getItem('Qicon');
    }

    ngOnChanges(): void {
        if(this.checkListItems){
            // this.checkListItems.forEach(element => {
            //     element.pic = this.picService.loadPic(
            //         "JobCard_" + element.DocEntry + 
            //                 "_CheckList_" + element.LineId)
            // });
            this.pick(this.checkListItems[0]);
        }
    }

    pick(item : XIS_JOBS9Collection){
        // if(this.commentActive && this.selected == item){
        //     this.commentActive = false;
        // }
        this.commentActive = false;
        this.selected = item;
    }

    Stts1(item : XIS_JOBS9Collection): void {
        item.U_TaskStts = "1";
        this.setDirty();
    }

    Stts0(item : XIS_JOBS9Collection): void {
        item.U_TaskStts = "0";
        this.setDirty();
    }

    Stts2(item : XIS_JOBS9Collection): void {
        item.U_TaskStts = "2";
        this.setDirty();
    }

    Change(event: any){
        this.setDirty();
        var pic = event.currentTarget.files[0] as File;
        this.selected.pic = pic;
        //this.upS.makeFileRequest(this.URL, arr);
    }

    comment(event: any): void{
        if(event.target.parentElement.parentElement.parentElement.className.search('active') != -1){
            event.stopPropagation();
        }
        event.target.parentElement.parentElement.parentElement.replaceWith(event.target.parentElement.parentElement.parentElement);
        this.commentActive = !this.commentActive;
        this.setDirty();
    }

    input(event: any): void{
        event.stopPropagation();
    }

    setDirty(): void {
        this.selected.job9Dirty = true;
    } 

    setConst(): void{
        this.selected.U_RsrcCode = sessionStorage.getItem("EmpID");
        this.selected.U_StrtDate = new Date(Date.now()).toLocaleDateString()
                    .replace(".","-").replace(".","-")
                    .split('-').reverse().join('-');
        this.selected.U_StrtHour = new Date(Date.now()).toLocaleTimeString();
        this.selected.U_Source = 'M';
    }

    scroll(event: any){
        let element = document.querySelector('.li-checkList.active');
        element.scrollIntoView(element);
    }

    onChange(event: any){
        var files = event.srcElement.files;
        console.log(files);
    }
}
import {Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { XIS_JOBS2Collection } from '../variables/XIS_JOBS2Collection';
import { XIS_JOBS11Collection } from '../variables/XIS_JOBS11Collection';

@Component({
    selector: 'jobCard-timeReport',
    templateUrl: 'timeReport.html',
    styleUrls: ['../styles/jobCard.css', '../styles/timeReport.css']
})

export class JobCardTimeReportComponent implements OnChanges, OnInit {
    @Input() timeReportItems: XIS_JOBS2Collection[];
    @Input() timeReport11: XIS_JOBS11Collection[];
    @Input() docEntry: string;
    selected: XIS_JOBS2Collection;

    HasActiveLine: boolean = false;
    timeLine: XIS_JOBS11Collection;
    
    subscription: any;

    offTimeDate: Date;
    offTimeStart: string;
    offTimeEnd: string;

    private _sec: number = 0;
    get sec(): number {
        if(this._sec != 0){
            //debugger;
        }
        if(!isNaN(this._sec)){
            return this._sec;
        }
        else{
            return 0;
        }
    }
    set sec(theSec: number){
        if(theSec != NaN){
            this._sec = theSec;
        }
        else{
            this._sec = 0;
        }
    }
    ngOnInit(): void{ 

    }
    ngOnChanges(): void {
        if(this.timeReportItems && this.timeReportItems.filter 
            (element => { return(element.U_PartCode != null) }).length > 0){
                let temp = new XIS_JOBS2Collection();
                // temp.U_Dep = sessionStorage.getItem('DepCode');
                temp.U_PartCode = "Job card general time entry";
                temp.DocEntry = this.docEntry;
                var a =this.timeReportItems.filter(element => 
                    { return(element.U_PartCode ==  temp.U_PartCode) });
                if(this.timeReportItems.filter(element => 
                    { return(element.U_PartCode ==  temp.U_PartCode) })
                    .length == 0){
                        this.timeReportItems.push(temp);
                }
                this.pick(this.timeReportItems[0]);
                this.getColl11Line(this.timeReportItems[0].LineId);
        }
    }

    ngOnDestroy() {
        if(this.subscription){
                this.subscription.unsubscribe();
            }
    }

    pick(item: XIS_JOBS2Collection){
        if(item != this.selected){
            this.selected = item;
            if(this.subscription){
                this.subscription.unsubscribe();
            }
            this.sec = 0;
            this.getColl11Line(this.selected.LineId);
        }
    }

    getColl11Line(lineId: string){
        if(this.timeReport11 && this.timeReport11.length > 0){
            let lines = this.timeReport11.filter(x => {
                return (x.U_JobLine == lineId && x.U_ToHr == null && 
                    x.U_FromHr != null)
            });
            let line = lines[lines.length - 1];
            if(line){
                this.HasActiveLine = true;
                line.newLine = false;
                this.timeLine = line;
                let timer = Observable.timer(0,1000);
                var b = this.dateFromString(
                    line.U_FromDt, line.U_FromHr);
                if(isNaN(b) || b == undefined){
                    this.HasActiveLine = false;
                    return;
                }
                var a = (Date.now() - b);
                if(this.subscription){
                    this.sec = 0;
                    this.subscription.unsubscribe();
                }
                this.subscription = timer.subscribe(t=> 
                    (this.sec = (a + (t * 1000)))); 
            }
            else{
                this.HasActiveLine = false;
                this.timeLine = null;
            }
        }
        else{
            this.HasActiveLine = false;
            this.timeLine = null;
        }
    }

    start(){
        this.setDirty;
        this.timeLine = new XIS_JOBS11Collection;
        this.timeLine.DocEntry = this.selected.DocEntry;
        this.timeLine.newLine = true;
        this.timeLine.U_EMPID = localStorage.getItem('EmpId');
        var d = Date.now();
        this.timeLine.startTime = d;
        var start = new Date(d).toLocaleDateString('en-US');
        start = start.replace(".","-").replace(".","-");
        start =  start.replace("/", "-").replace("/", "-");
        start = start.split('-').reverse().join('-');
        this.timeLine.U_FromDt = start;
        this.timeLine.U_FromHr = new Date(d).toLocaleTimeString('en-US', { hour12: false });
        this.timeLine.U_JobLine = this.selected.LineId;
        this.timeLine.U_RprtType = 'RealTime';
        let timer = Observable.timer(0,1000);
        this.subscription = timer.subscribe(t=> (this.sec = t * 1000));       
        this.timeReport11.push(this.timeLine);
        this.HasActiveLine = true;
    }

    stop(){
        this.setDirty;
        var d = Date.now();
        this.timeLine.newLine = true;
        this.timeLine.U_ToHr =  new Date(d).toLocaleTimeString('en-US', { hour12: false });
        this.timeLine.endTime = d;
        this.timeLine.startTime = this.dateFromString(
            this.timeLine.U_FromDt, this.timeLine.U_FromHr);
        var t =   new Date(this.timeLine.endTime).valueOf() -
            new Date(this.timeLine.startTime).valueOf();
        this.sec = this.sec;
        this.timeLine.U_TotalHrs = (t/3600000).toFixed(1);
        this.HasActiveLine = false;
        this.subscription.unsubscribe();
    }

    setDirty(): void {
        this.selected.job2Dirty = true;
    }

    dateFromString(d:string, t:string): number{
        if(!d){
            d = new Date(1970, 11, 13).toLocaleDateString('en-US');
            d = d.replace(".","-").replace(".","-");
            d = d.replace("/","-").replace("/","-");
            d = d.split('-').reverse().join('-');              
        }
        if(d.length < 10){
            var arr = d.split('-');
            if(arr[1].length < 2){
                arr[1] = "0" + arr[1];
            }
            if(arr[2].length < 2){
                arr[2] = "0" + arr[2];
            }
            d = arr.join("-");
        }
        if(t.length < 8){
            var arr = t.split(':');
            if(arr[0].length < 2){
                arr[0] = "0" + arr[0];
            }
            if(arr[1].length < 2){
                arr[1] = "0" + arr[1];
            }
            if(arr[2].length < 2){
                arr[2] = "0" + arr[2];
            }
            t = arr.join(":");
        }
        var dy = d.substr(0,4);
        var dd = d.substr(5,2);
        var dm = d.substr(8,2);
        d = dy + "-" + dm + "-" + dd;
        var res = new Date(d + 'T' + t).valueOf();
        if(isNaN(res) || res == undefined){
            d = dy + "-" + dd + "-" + dm;
            res = new Date(d + 'T' + t).valueOf();
        }
        res = res + (new Date().getTimezoneOffset() * 60000)
        return res;
    }

    offTimeUpdate(){
        this.offTimeStart = this.offTimeStart + ":00";
        this.offTimeEnd = this.offTimeEnd + ":00";
        var startDate = this.dateFromString(this.offTimeDate.toString(), 
            this.offTimeStart);
        var endDate = 0;
        if(this.offTimeEnd > this.offTimeStart){
            endDate = this.dateFromString(this.offTimeDate.toString(), 
            this.offTimeEnd);
        }
        else{
            var arr = this.offTimeDate.toString().split('-');
            arr[2] = (+arr[2] + 1).toString();
            var next = arr.join("-");
            endDate = this.dateFromString(next, 
            this.offTimeEnd);
        }

        this.setDirty;
        this.timeLine = new XIS_JOBS11Collection;
        this.timeLine.DocEntry = this.selected.DocEntry;
        this.timeLine.newLine = true;
        this.timeLine.U_EMPID = localStorage.getItem('EmpId');
        this.timeLine.startTime = startDate;
        this.timeLine.U_FromDt = new Date(startDate).toLocaleDateString('en-US')
            .replace(".","-").replace(".","-")
                    .split('-').reverse().join('-');
        this.timeLine.U_FromHr = new Date(startDate).toLocaleTimeString('en-US', { hour12: false });
        this.timeLine.U_JobLine = this.selected.LineId;
        this.timeLine.U_RprtType = 'OffTime';
   
        this.timeLine.U_ToHr =  new Date(endDate).toLocaleTimeString('en-US', { hour12: false });
        this.timeLine.endTime = endDate;
        var t = endDate - startDate;
        this.timeLine.U_TotalHrs = (t/3600000).toFixed(1);
        this.timeReport11.push(this.timeLine);
        this.HasActiveLine = false;
        this.resetForm();
    }

    resetForm(){
        this.offTimeDate = null;
        this.offTimeStart = null;
        this.offTimeEnd = null;
    }

    scroll(event: any){
        if(event.target.localName == 'a'){
            return;
        }
        let element = document.querySelector('.li-checkList.active');
        if(element){
            element.scrollIntoView(element);
        }
    }

    scrollAnc(event: any) : void{
        let element = document.querySelector('.active .tab-content');
        if(element){
            element.scrollIntoView(element);
        }
    }

    scrollSubmit(event: any) : void{
        let element = document.querySelector('.active .tab-content');
        if(element){
            element.scrollIntoView(element);
        }
    }
}
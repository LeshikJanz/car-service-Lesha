import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
const moment = require('moment');

import { selectTimeReport, startTimer, stopTimer } from '../actions';
import { XIS_JOBS11Collection } from "../../../jobCard/variables/XIS_JOBS11Collection";

@Component({
  selector: 'job-card-item-time-report',
  templateUrl: '../templates/JobCardItemTimeReport.html',
  styleUrls: [
    '../styles/report.css',
    '../styles/checklist.css'
  ]
})

export class JobCardItemTimeReport {
  private collection$ = 'XIS_JOBS2Collection';
  private jobCollection$ = 'XIS_JOBS11Collection';

  timeReport$: any;
  items$: any[];
  jobs$: any;
  lastJob$: any;
  selected$: any;
  object$: any;
  msec$: number = 0;
  subscription: any;
  HasActiveLine: boolean = false;
  item: any;
  DocEntry$: any;
  delta$: number = 0;

  constructor(private store: Store<any>) {
    this.timeReport$ = new XIS_JOBS11Collection;
    this.msec$ = 0;
    store
        .select('JobCard')
        .subscribe(
            (state: any) => {
              this.jobs$ = state.item.collections[this.jobCollection$];
              this.items$ = state.item.collections[this.collection$];
              this.object$ = state.item.object;
              this.DocEntry$ = state.item.object.DocEntry$;
              this.selected$ = state.report;
            }
        );
  }

  unsubscribe() {
    this.subscription.unsubscribe();
    this.HasActiveLine = false;
  }

  updateTimer() {
    if(this.subscription) this.unsubscribe();
    if (this.lastJob$ && !this.lastJob$.U_ToHr) {
      let timer = Observable.timer(0, 1000);
      const delta = Date.now() - moment.duration(this.lastJob$.U_FromHr, "h:mm:ss" ).asMilliseconds();
      this.HasActiveLine = true;
      this.subscription = timer.subscribe(t => (this.msec$ = t * 1000 + delta));
    }
  }

  select(item: any) {
    this.lastJob$ = this.jobs$[this.jobs$.length - 1];
    this.updateTimer();
    this.store.dispatch(selectTimeReport(item));
  }

  start() {
    this.timeReport$.DocEntry = this.object$.DocEntry;
    this.timeReport$.LineId = this.jobs$.length;
    this.timeReport$.U_JobLine = this.selected$.LineId;
    this.timeReport$.U_FromDt = moment().format('YYYY-DD-M');
    this.timeReport$.U_FromHr = moment().format('h:mm:ss');
    let timer = Observable.timer(0, 1000);
    this.subscription = timer.subscribe(t => (this.msec$ = t * 1000));
    this.HasActiveLine = true;
    console.log("this.timeReport$");
    console.log(this.timeReport$);
    this.store.dispatch(startTimer(this.timeReport$));
  }

  stop() {
    this.timeReport$ = this.jobs$[this.jobs$.length - 1];
    this.timeReport$.endTime = Date.now();
    this.timeReport$.U_ToHr = new Date(this.timeReport$.endTime).toLocaleTimeString('en-US', {hour12: false});
    this.jobs$[this.jobs$.length - 1] = this.timeReport$;
    this.HasActiveLine = false;
    this.subscription.unsubscribe();
    this.store.dispatch(stopTimer(this.jobs$));
    this.timeReport$ = {};
  }

}
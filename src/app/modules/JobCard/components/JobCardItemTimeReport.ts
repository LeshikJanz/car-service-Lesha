import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
const moment = require('moment');

import { selectTimeReport, startTimer, stopTimer } from '../actions';
import { XIS_JOBS11Collection } from "../../../jobCard/variables/XIS_JOBS11Collection";
import { STARTED_POSITION } from "../constants/index";

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
  msec$: number = 0;
  subscription: any;
  HasActiveLine: boolean = false;
  item: any;
  DocEntry$: any;
  offTimeDate: any;
  offTimeStart: any;
  offTimeEnd: any;

  constructor(private store: Store<any>) {
    this.timeReport$ = new XIS_JOBS11Collection;
    store
        .select('JobCard')
        .subscribe(
            (state: any) => {
              this.jobs$ = state.item.collections[this.jobCollection$];
              this.items$ = state.item.collections[this.collection$];
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
      this.HasActiveLine = true;
      const delta = moment().valueOf() - moment.duration(this.lastJob$.U_FromHr, "HH:mm:ss" ).asMilliseconds();
      let timer = Observable.timer(0, 1000);
      this.subscription = timer.subscribe(t => (this.msec$ = t * 1000 + delta));
    }else {
      this.msec$ = moment.duration(this.lastJob$.U_ToHr, "HH:mm:ss" ).asMilliseconds() - moment.duration(this.lastJob$.U_FromHr, "HH:mm:ss" ).asMilliseconds() - STARTED_POSITION;
    }
  }

  select(item: any) {
    this.lastJob$ = this.jobs$[this.jobs$.length - 1];
    this.updateTimer();
    this.store.dispatch(selectTimeReport(item));
  }

  start() {
    this.timeReport$.DocEntry = this.DocEntry$;
    this.timeReport$.LineId = this.jobs$.length;
    this.timeReport$.U_JobLine = this.selected$.LineId;
    this.timeReport$.U_FromDt = moment().format('YYYY-DD-M');
    this.timeReport$.U_FromHr = moment().format('HH:mm:ss');

    let timer = Observable.timer(0, 1000);
    this.subscription = timer.subscribe(t => (this.msec$ = t * 1000));
    this.HasActiveLine = true;
    this.store.dispatch(startTimer(this.timeReport$));
  }

  stop() {
    this.timeReport$ = this.jobs$[this.jobs$.length - 1];
    this.timeReport$.U_ToHr = moment().format('h:mm:ss');
    this.jobs$[this.jobs$.length - 1] = this.timeReport$;

    this.HasActiveLine = false;
    this.subscription.unsubscribe();
    this.store.dispatch(stopTimer(this.jobs$));
    this.timeReport$ = {};
  }

  offTimeUpdate() {
    this.timeReport$.DocEntry = this.DocEntry$;
    this.timeReport$.LineId = this.jobs$.length;
    this.timeReport$.U_JobLine = this.selected$.LineId;
    this.timeReport$.U_FromDt = this.offTimeDate;
    this.timeReport$.U_FromHr = this.offTimeStart;
    this.timeReport$.U_ToHr = this.offTimeEnd;

    this.jobs$[this.jobs$.length] = this.timeReport$;
    this.store.dispatch(stopTimer(this.jobs$));
    this.timeReport$ = {};
  }

}
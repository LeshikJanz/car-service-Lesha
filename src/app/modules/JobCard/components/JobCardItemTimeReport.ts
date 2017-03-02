import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
const moment = require('moment');

import { selectTimeReport, startTimer, stopTimer } from '../actions';
import { XIS_JOBS11Collection } from "../../../jobCard/variables/XIS_JOBS11Collection";
import { STARTED_POSITION } from "../constants/index";
import { XIS_JOBS2Collection } from "../../../jobCard/variables/XIS_JOBS2Collection";

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
  curJob$: any;
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
    store
      .select('JobCard')
      .subscribe(
        (state: any) => {
          this.jobs$ = state.item.collections[this.jobCollection$];
          this.items$ = state.item.collections[this.collection$];
          this.DocEntry$ = state.item.object.DocEntry;
          if (this.isGeneralTimeNeed()) this.addGeneralTime();
        }
      );
  }

  unsubscribe() {
    this.subscription.unsubscribe();
    this.HasActiveLine = false;
  }

  updateTimer() {
    if (this.subscription) this.unsubscribe();

    if (this.curJob$) {
      if (this.curJob$.U_ToHr == null) {
        this.HasActiveLine = true;
        const delta = moment().valueOf() - moment.duration(this.curJob$.U_FromHr, "HH:mm:ss").asMilliseconds();
        let timer = Observable.timer(0, 1000);
        this.subscription = timer.subscribe(t => (this.msec$ = t * 1000 + delta));
      } else this.msec$ = moment.duration(this.curJob$.U_ToHr, "HH:mm:ss").asMilliseconds() - moment.duration(this.curJob$.U_FromHr, "HH:mm:ss").asMilliseconds() - STARTED_POSITION;
    } else {
      this.msec$ = -STARTED_POSITION
    }
  }

  getActiveJob(LineId: any) {
    let lines = this.jobs$.filter((x: any) => {
      return (x.U_JobLine == LineId && x.U_FromHr != null )
    });
    return lines[lines.length - 1];
  }

  select(item: any) {
    this.selected$ = item;
    this.curJob$ = this.getActiveJob(item.LineId);
    this.updateTimer();
    this.store.dispatch(selectTimeReport(item));
  }

  start() {
    this.timeReport$ = {};
    this.timeReport$.DocEntry = this.DocEntry$;
    this.timeReport$.LineId = this.jobs$.length;
    this.timeReport$.U_JobLine = this.selected$.LineId;
    this.timeReport$.U_FromDt = moment().format('YYYY-DD-M');
    this.timeReport$.U_FromHr = moment().format('HH:mm:ss');
    this.timeReport$.U_ToHr = null;
    this.timeReport$.U_RprtType = "RealTime";

    let timer = Observable.timer(0, 1000);
    this.subscription = timer.subscribe(t => (this.msec$ = t * 1000));
    this.HasActiveLine = true;
    this.store.dispatch(startTimer(this.timeReport$));
  }

  stop() {
    this.timeReport$ = this.getActiveJob(this.selected$.LineId);
    this.timeReport$.U_ToHr = moment().format('HH:mm:ss');
    this.jobs$[this.timeReport$.LineId - 1] = this.timeReport$;

    this.HasActiveLine = false;
    this.subscription.unsubscribe();
    this.store.dispatch(stopTimer(this.jobs$));
  }

  offTimeUpdate() {
    this.timeReport$.DocEntry = this.DocEntry$;
    this.timeReport$.LineId = this.jobs$.length;
    this.timeReport$.U_JobLine = this.selected$.LineId;
    this.timeReport$.U_FromDt = this.offTimeDate;
    this.timeReport$.U_FromHr = this.offTimeStart;
    this.timeReport$.U_ToHr = this.offTimeEnd;
    this.timeReport$.U_RprtType = "OffTime";

    this.jobs$[this.jobs$.length] = this.timeReport$;
    this.store.dispatch(stopTimer(this.jobs$));
  }

  isGeneralTimeNeed() {
    return this.items$[this.items$.length - 1].U_PartCode != "Job card general time entry" && this.items$[this.items$.length - 1].U_PartCode
  }

  addGeneralTime() {
    const generalJob = new XIS_JOBS2Collection();
    generalJob.U_PartCode = "Job card general time entry";
    generalJob.DocEntry = this.DocEntry$
    this.items$.push(generalJob);
  }

  getCurrentTotalHours() {
    let totalHours = 0;
    this.jobs$.forEach((elem: any) => totalHours += moment.duration(elem.U_ToHr, "HH:mm:ss").asHours() - moment.duration(elem.U_FromHr, "HH:mm:ss").asHours())
    return totalHours;
  }
}
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectTimeReport } from '../actions';

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
  items$: any[];
  selected$: any;
  DocEntry$: string;

  constructor(private store: Store<any>) {
    store
      .select('JobCard')
      .subscribe(
        (state: any) => {
          this.items$ = state.item.collections[this.collection$];
          this.DocEntry$ = state.item.object.DocEntry;
          this.selected$ = state.item.report;
        }
      );
  }

  select(item: any) {
    this.store.dispatch(selectTimeReport(item));
  }

}

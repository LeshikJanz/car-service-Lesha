import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { openTimeReportTab } from "../actions";

@Component({
  selector: 'time-report-item',
  templateUrl: '../templates/TimeReportItem.html',
  styleUrls: [
    '../styles/item.css',
    '../styles/navigation.css'
  ]
})

export class TimeReportTab {
  item$: Observable<any>;
  isCheckListOpen$: boolean = false;
  isTimeReportOpen$: boolean = false;
  isPartsIssueOpen$: boolean = false;

  constructor(private store: Store<any>) {
    store
      .select('JobCard')
      .subscribe(
        (state: any) => {
          this.item$ = state.item.object
          this.isTimeReportOpen$ = state.tabs.isTimeReportOpen;
        }
      );
  }

  handleOpenTab(){
    this.store.dispatch(openTimeReportTab());
  }
}

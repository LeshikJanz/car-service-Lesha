import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { openTimeReportTab } from "../actions";

@Component({
  selector: 'time-report-tab',
  templateUrl: '../templates/TimeReportTab.html',
  styleUrls: [
    '../styles/item.css',
    '../styles/navigation.css'
  ]
})

export class TimeReportTab {
  item$: Observable<any>;
  isTimeReportOpen$: boolean = false;

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

  save(){
    console.log("Save");
  }
}

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { openTimeReportTab } from "../../actions";
import { JobCardService } from "../../../../jobCard/services/jobCard.service";

@Component({
  selector: 'time-report-tab',
  templateUrl: '../../templates/TimeReportTab.html',
  styleUrls: [
    '../../styles/item.css',
    '../../styles/navigation.css'
  ]
})

export class TimeReportTab {
  item$: Observable<any>;
  collections$: any;
  isTimeReportOpen$: boolean = false;
  respo: any;

  constructor(private store: Store<any>, private _jobCardService: JobCardService) {
    store
      .select('JobCard')
      .subscribe(
        (state: any) => {
          this.item$ = state.item.object;
          this.collections$ = state.item.collections;
          this.isTimeReportOpen$ = state.tabs.isTimeReportOpen;
        }
      );
  }

  handleOpenTab(){
    this.store.dispatch(openTimeReportTab());
  }

  save() {
    const item = {
      ...this.item$,
      ...this.collections$,
    }

    this._jobCardService.postJob(item).subscribe(res => this.respo = res);
  }
}

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'job-card-item-global',
  templateUrl: '../templates/JobCardItemGlobal.html',
  styleUrls: [
    '../styles/globals.css',
    '../styles/table.css'
  ]
})

export class JobCardItemGlobal {
  item$: Observable<any>;

  constructor(private store: Store<any>) {
    store
      .select('JobCard')
      .subscribe(
        (state: any) => this.item$ = state.item.object
      );
  }
}

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'job-card-item-header',
  templateUrl: '../templates/JobCardHeader.html',
  styleUrls: ['../styles/table.css', '../styles/item.css']
})

export class JobCardItemHeader {
  item$: Observable<any>;

  constructor(private store: Store<any>) {
    store
      .select('JobCard')
      .subscribe(
        (state: any) => this.item$ = state.item.object
      );
  }
}

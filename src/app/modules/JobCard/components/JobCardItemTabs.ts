import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'job-card-item-tabs',
  template: `
    <div></div>
  `
})

export class JobCardItemTabs {
  item$: Observable<any>;

  constructor(private store: Store<any>) {
    store
      .select('JobCard')
      .subscribe(
        (store: any) => this.item$ = store.item
      );
  }
}

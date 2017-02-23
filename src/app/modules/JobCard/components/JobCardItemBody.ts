import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { selectTab } from '../actions';

@Component({
  selector: 'job-card-item-body',
  template: `
    <div id="IconsBar">
      <button
        id="GL"
        type="button"
        class="btn btn-info btn-circle btn-xl"
        (click)="select('GL')"
        [class.active]="tabs$['GL']"
      >
        <i class="glyphicon glyphicon-certificate"></i>
      </button>
      <button
        id="CL"
        type="button"
        class="btn btn-info btn-circle btn-xl"
        (click)="select('CL')"
        [class.active]="tabs$['CL']"
      >
        <i class="glyphicon glyphicon-list" ></i>
      </button>
      <button
        id="TR"
        type="button"
        class="btn btn-info btn-circle btn-xl"
        (click)="select('TR')"
        [class.active]="tabs$['TR']"
      >
        <i class="glyphicon glyphicon-time"></i>
      </button>
    </div>
    <job-card-item-tabs></job-card-item-tabs>
  `,
  styleUrls: ['../styles/icons.css']
})

export class JobCardItemBody {
  item$: Observable<any>;
  tabs$: Observable<any>;

  constructor(private store: Store<any>) {
    store
      .select('JobCard')
      .subscribe(
        (state: any) => {
          this.item$ = state.item.object;
          this.tabs$ = state.item.tabs;
        }
      );
  }

  select(tab: string) {
    this.store.dispatch(selectTab(tab));
  }
}

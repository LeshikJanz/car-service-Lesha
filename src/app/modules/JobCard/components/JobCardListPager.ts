import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
import { JobCardResolve } from '../services/JobCardResolve';

import {
  prevPage,
  nextPage
} from '../actions';

@Component({
  selector: 'job-card-list-pager',
  template: `
		<li class="list-pager">
      <button 
        class="page-button btn-primary" 
        type="button" 
        (click)="next()"
        [disabled]="items$ <= (page$ * size$)"
        [class.disabled]="items$ <= (page$ * size$)" 
        [class.btn-primary]="items$ > (page$ * size$)"
        [class.btn-default]="items$ <= (page$ * size$)"
      >
        <i class="glyphicon glyphicon-arrow-right"></i>
      </button>		
      <button 
        class="page-button" 
        type="button" 
        (click)="prev()"
        [disabled]="!page$"
        [class.disabled]="!page$" 
        [class.btn-primary]="page$ > 0" 
        [class.btn-default]="!page$"
      >
        <i class="glyphicon glyphicon-arrow-left"></i>
      </button>
		</li>
  `,
  styleUrls: ['../styles/pager.css']
})

export class JobCardListPager {
  page$: Observable<number>;
  size$: Observable<number>;
  items$: number;

  constructor(
    private store: Store<any>,
    private fetch: JobCardResolve
  ) {
    store
      .select('JobCard')
      .subscribe(
        (state: any) => {
          this.page$ = state.page.number;
          this.size$ = state.page.size;
          this.items$ = Number(state.list['odata.count']);
        }
      );
  }

  prev() {
    this.store.dispatch(prevPage());
    this.fetch.getJobCard();
  }

  next() {
    this.store.dispatch(nextPage());
    this.fetch.getJobCard();
  }
}

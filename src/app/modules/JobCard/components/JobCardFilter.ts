import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store';

import { selectFilter } from '../actions';

@Component({
  selector: 'job-card-filter',
  template: `
    <div class="col-xs-2 dropdown-filter-div">
			<button class="dropdown">
        <i class="glyphicon glyphicon-filter dropdown dropdown-toggle" data-toggle="dropdown">
				  <span class="caret"></span>
        </i>
				<ul class="dropdown-menu filter">
          <li *ngFor="let option of options$">
            <a tabindex="-1" (click)="pick(option)">
              {{option}}
            </a>
					</li>
        </ul>
      </button>      
    </div>	
  `
})

export class JobCardFilter {
  options$: Observable<any[]>;

  constructor(private store: Store<any>) {
    store
      .select('JobCard')
      .subscribe(
        (state: any) => this.options$ = state.page.options
      )
  }

  pick(option: string) {
    this.store.dispatch(selectFilter(option));
  }

}

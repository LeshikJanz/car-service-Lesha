import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store';
import { JobCardResolve } from '../services/JobCardResolve';

import { refreshList } from '../actions';

@Component({
  selector: 'job-card-navigation',
  template: `
    <div class="JobCardHeader master">
    	<div class="col-xs-2">
				<button routerLink="/dashboard" routerLinkActive="active" Id="Anc">
					<i class="glyphicon glyphicon-arrow-left"></i>
				</button>
			</div>
			<div class="col-xs-2" (click)="refresh()">
				<button>
					<i class="glyphicon glyphicon-refresh"></i>
				</button>
			</div>		
      <div class="filter-header col-xs-6">
        <h3>{{filter$}}</h3>
      </div>  			
      <job-card-filter></job-card-filter>	
    </div>  
  `,
  styleUrls: ['../styles/navigation.css']
})

export class JobCardNavigation {
  filter$: Observable<string>;

  constructor(
    private store: Store<any>,
    private fetch: JobCardResolve
  ) {
    store
      .select('JobCard')
      .subscribe(
        (state: any) => this.filter$ = state.page.filter
      );
  }

  refresh() {
    this.store.dispatch(refreshList());
    this.fetch.getJobCard();
  }
}

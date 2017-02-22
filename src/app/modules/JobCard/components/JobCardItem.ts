import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'job-card-item',
  template: `
    <div class="panel panel-default jobCard-Detail">
    
    </div>
  `
})

export class JobCardItem {
  item$: Observable<any>;

  constructor(private store: Store<any>) {
    store
      .select('JobCard')
      .subscribe(
        (state: any) => this.item$ = state.item
      );
  }

}

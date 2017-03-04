import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'job-card-item',
  templateUrl: '../../templates/JobCardItem.html',
  styleUrls: [
    '../../styles/item.css'
  ]
})

export class JobCardItem {
  item$: Observable<any>;

  constructor(private store: Store<any>) {
    store
      .select('JobCard')
      .subscribe(
        (state: any) => {
          this.item$ = state.item.object
        }
      );
  }

  slideIn() {

  }
}

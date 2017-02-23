import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { viewItem } from '../actions';

@Component({
  selector: 'job-card-list',
  template: `
    <ul class="nav nav-pills nav-stacked ul-master">
      <li 
        *ngFor="let item of items$" 
        role="presentation" 
        [class.active]="activeItemNum$ === item.DocNum"
      >
        <a (click)="pick(item)">
          <h4>{{ item.DocNum }}</h4>
          <p>
            {{ item.U_OwnBPN }}
            {{ item.U_Status }}
            {{ item.U_MdlCode }}
            {{ item.U_LicNum }}
            {{ item.U_EntryDt }}
          </p>
        </a>
      </li>
      <job-card-list-pager></job-card-list-pager>
    </ul>
  `,
  styleUrls: ['../styles/list.css']
})

export class JobCardList {
  items$: Observable<any[]>;
  activeItemNum$: Observable<number>;

  constructor(private store: Store<any>) {
    store
      .select('JobCard')
      .subscribe(
        (state: any) => {
          this.items$ = state.list.value;
          this.activeItemNum$ = state.item.DocNum;
        }
      );
  }

  pick(item: any) {
    this.store.dispatch(viewItem(item));
  }
}

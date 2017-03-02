import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { picService } from '../services/picService';

import {
  orderStatus,
  addPicture
} from '../actions';

@Component({
  selector: 'job-card-item-checklist',
  templateUrl: '../templates/JobCardItemChecklist.html',
  styleUrls: ['../styles/checklist.css']
})

export class JobCardItemChecklist {
  private collection$ = 'XIS_JOBS9Collection';
  itemId$: Observable<number>;
  items$: Observable<any[]>;
  activeComment: number = null;

  constructor(
    private store: Store<any>,
    private picService: picService
  ) {
    store
      .select('JobCard')
      .subscribe(
        (state: any) => {
          this.items$ = state.item.collections[this.collection$];
          this.itemId$ = state.item.object.DocNum;
        }
      );
  }

  handleOrderStatusChange(item: any, status: string) {
    item.U_TaskStts = status;
    this.store.dispatch(orderStatus({ [this.collection$]: item }));
  }

  handleCommentChange(item: any) {
    this.store.dispatch(orderStatus({ [this.collection$]: item }));
  }

  handleCommentShow(id: number): void {
    this.activeComment = id === this.activeComment ? null : id;
  }

  handlePictureChange(event: any) {
    //this.selected.pic = event.currentTarget.files[0] as File;
  }
}

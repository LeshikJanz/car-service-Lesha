import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { picService } from '../services/picService';

import {
  confirmOrder,
  declineOrder,
  haveQuestionOrder,
  addComment,
  addPicture
} from '../actions';

@Component({
  selector: 'job-card-item-checklist',
  templateUrl: '../templates/JobCardItemChecklist.html',
  styleUrls: ['../styles/checklist.css']
})

export class JobCardItemChecklist {
  private collection$ = 'XIS_JOBS9Collection';
  items$: Observable<any[]>;
  commentActive: boolean = false;

  constructor(
    private store: Store<any>,
    private picService: picService
  ) {
    store
      .select('JobCard')
      .subscribe(
        (state: any) => {
          this.items$ = state.item.collections[this.collection$];
        }
      );
  }

  confirm(id: number) {
    this.store.dispatch(confirmOrder({ id, collection: this.collection$ }));
  }

  decline(id: number) {
    this.store.dispatch(declineOrder({ id, collection: this.collection$ }));
  }

  question(id: number) {
    this.store.dispatch(haveQuestionOrder({ id, collection: this.collection$ }));
  }

  Change(event: any) {
    //this.selected.pic = event.currentTarget.files[0] as File;
  }

  comment(event: any): void {
    this.commentActive = !this.commentActive;
  }

  onChange(event: any) {
    const files = event.srcElement.files;
    console.log(files);
  }

  saveComment(item: any) {
    this.store.dispatch(addComment(item));
  }
}

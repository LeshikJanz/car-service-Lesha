import { Component, Input, OnChanges, OnInit, ApplicationRef } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store';
import { XIS_JOBS9Collection } from '../variables/XIS_JOBS9Collection';
import { picService } from '../services/picService';
import {
  fetchOrderList,
  confirmOrder,
  declineOrder,
  haveQuestionOrder,
  addComment,
  addPicture
} from '../actions/checkListActions';
import { IItemState } from "../interfaces/checkList";

//import { FileUploader } from 'ng2-file-upload'; 

@Component({
  selector: 'jobCard-checkList',
  templateUrl: 'checkList.html',
  styleUrls: ['../styles/jobCard.css']
})

export class JobCardCheckListComponent implements OnChanges {

  items$: Observable<Array<IItemState>>
  isOrderConfirmed$: Observable<boolean>;
  isOrderDeclined$: Observable<boolean>;
  isOrderHaveQuestion$: Observable<boolean>;
  comment$: Observable<string>;

  @Input() checkListItems: XIS_JOBS9Collection[];
  selected: XIS_JOBS9Collection;
  commentActive: boolean = false;

  constructor(private picService: picService, private store: Store<any>) {
    store
      .select('checklist')
      .subscribe(
        (state: any) => {
          this.items$ = state.items;
          this.isOrderConfirmed$ = state.isOrderConfirmed;
          this.isOrderDeclined$ = state.isOrderDeclined;
          this.isOrderHaveQuestion$ = state.isOrderHaveQuestion;
          this.comment$ = state.comment;
        });
  }

  confirmOrder(item: XIS_JOBS9Collection) {
    this.store.dispatch(confirmOrder(item.LineId));
    this.setDirty();
  }

  declineOrder(item: XIS_JOBS9Collection) {
    this.store.dispatch(declineOrder(item.LineId));
    this.setDirty();
  }

  haveQuestionOrder(item: XIS_JOBS9Collection) {
    this.store.dispatch(haveQuestionOrder(item.LineId));
    this.setDirty();
  }

  ngOnChanges(): void {
    this.store.dispatch(fetchOrderList(this.checkListItems));
  }

  pick(item: XIS_JOBS9Collection) {
    this.commentActive = false;
    this.selected = item;
  }

  Change(event: any) {
    this.setDirty();
    var pic = event.currentTarget.files[0] as File;
    this.selected.pic = pic;
  }

  comment(event: any): void {
    this.commentActive = !this.commentActive;
    this.setDirty();
  }

  setDirty(): void {
    this.selected.job9Dirty = true;
  }

  onChange(event: any) {
    var files = event.srcElement.files;
    console.log(files);
  }

  saveComment(item: any) {
    this.store.dispatch(addComment(item));
  }
}
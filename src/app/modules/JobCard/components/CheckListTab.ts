import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { openCheckListTab } from "../actions";

@Component({
  selector: 'check-list-tab',
  templateUrl: '../templates/CheckListTab.html',
  styleUrls: [
    '../styles/item.css',
    '../styles/navigation.css'
  ]
})

export class CheckListTab {
  item$: Observable<any>;
  isCheckListOpen$: boolean = false;

  constructor(private store: Store<any>) {
    store
      .select('JobCard')
      .subscribe(
        (state: any) => {
          this.item$ = state.item.object
          this.isCheckListOpen$ = state.tabs.isCheckListOpen;
        }
      );
  }

  handleOpenTab(){
    this.store.dispatch(openCheckListTab());
  }
}

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { openCheckListTab } from "../../actions";
import { JobCardService } from "../../../../jobCard/services/jobCard.service";

@Component({
  selector: 'check-list-tab',
  templateUrl: '../../templates/CheckListTab.html',
  styleUrls: [
    '../../styles/item.css',
    '../../styles/navigation.css'
  ]
})

export class CheckListTab {
  item$: Observable<any>;
  collections$: any;
  isCheckListOpen$: boolean = false;

  constructor(private store: Store<any>, private _jobCardService: JobCardService) {
    store
      .select('JobCard')
      .subscribe(
        (state: any) => {
          this.item$ = state.item.object;
          this.collections$ = state.item.collections;
          this.isCheckListOpen$ = state.tabs.isCheckListOpen;
        }
      );
  }

  handleOpenTab(){
    this.store.dispatch(openCheckListTab());
  }

  save(){
    const data = Object.assign({}, this.item$, this.collections$);
    this._jobCardService.postJob(data);
  }
}

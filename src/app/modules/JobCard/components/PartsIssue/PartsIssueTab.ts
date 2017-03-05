import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { openPartsIssueTab } from "../../actions";
import { JobCardService } from "../../../../jobCard/services/jobCard.service";

@Component({
  selector: 'parts-issue-tab',
  templateUrl: '../../templates/PartsIssueTab.html',
  styleUrls: [
    '../../styles/item.css',
    '../../styles/navigation.css'
  ]
})

export class PartsIssueTab {
  item$: Observable<any>;
  collections$: any;
  respo: any;
  isPartsIssueOpen$: boolean = false;

  constructor(private store: Store<any>, private _jobCardService: JobCardService) {
    store
      .select('JobCard')
      .subscribe(
        (state: any) => {
          this.item$ = state.item.object;
          this.collections$ = state.item.collections;
          this.isPartsIssueOpen$ = state.tabs.isPartsIssueOpen;
        }
      );
  }

  handleOpenTab(){
    this.store.dispatch(openPartsIssueTab());
  }

  save() {
    const item = {
      ...this.item$,
      ...this.collections$,
    }

    this._jobCardService.postJob(item).subscribe(res => this.respo = res);
  }

  @Output() showAllIssues = new EventEmitter();

  onShowAllIssues() {
    this.showAllIssues.emit();
  }
}

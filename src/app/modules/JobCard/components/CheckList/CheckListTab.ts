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
  respo: any;

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

  handleOpenTab() {
    this.store.dispatch(openCheckListTab());
  }

  sendRequestFor9job() {
    const item = {
      "XIS_JOBS9Collection": [{
        LineId: "1",
        U_Notes: "Lesha11",
        U_StrtDate: "2017-03-01",
        U_StrtHour: "06:46:00",
        U_TaskStts: "0"
      },
        {
          LineId: "2",
          U_Notes: "Lesha99",
          U_StrtDate: "2017-03-01",
          U_StrtHour: "06:46:00",
          U_TaskStts: "0"
        }]
    }

        this._jobCardService.testPostJob9(item).subscribe(res => this.respo = res);
    //this._jobCardService.postjob9(item).subscribe(res => this.respo = res);
  }

    save()
    {
      console.log("save");
      const data = Object.assign({}, this.item$, this.collections$);
      //this._jobCardService.postJob(data);
      this._jobCardService.postjob11(this.collections$.XIS_JOBS11Collection);
    }
  }

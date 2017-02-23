import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'job-card-item',
  template: `
    <div class="panel panel-default jobCard-Detail" *ngIf="item$">
      <div class="panel-heading JobCard">
        <div class="JobCardHeader">
          <button (click)="slideIn()">
            <i class="pop glyphicon glyphicon-menu-left"></i>
          </button>
          <div>
            <label>
                {{"Job Card " + item$.DocNum}}
            </label>
          </div>
        </div>
      </div>
      <section>
        <div id="JCHeader">
          <div class="table-responsive table-condensed borderless container-fluid">
            <div class="col-lg-5 col-md-8 col-sm-10 col-xs-12">
              <job-card-item-header></job-card-item-header>
            </div>
          </div>
          <div style="clear: both;"></div>
        </div>
        <div id="JCBody">
          <job-card-item-body></job-card-item-body>
        </div>
      </section>
    </div>
  `,
  styleUrls: [
    '../styles/item.css',
    '../styles/navigation.css'
  ]
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

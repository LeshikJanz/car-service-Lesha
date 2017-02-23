import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { searchItem } from '../actions';

@Component({
  selector: 'job-card-search',
  template: `
		<div class="search-lvl1">
			<div class="search-lvl2">
				<div class="search-lvl3">
					<form name="searchForm" method="post" class="search-form" #searchForm="ngForm" >
            <span (click)="search()" class="search-icon">
              <i class="glyphicon glyphicon-search"></i>
            </span>
						<span class="search-icon">
						  <a href="com.yscannerapp://ScanBarcode-activity">
						    <i class="glyphicon glyphicon-qrcode" Id="qr"></i>
						  </a>
						</span>
						<input
						  autocomplete="off"
						  type="search"
						  class="search-input"
						  placeholder="Search"
              name="searchInput"
              (keyup)="search()"
              [(ngModel)]="value"
            />
					</form>
				</div>
			</div>
		</div>
  `
})

export class JobCardSearch {
  value: string;

  constructor(private store: Store<any>) {}

  search() {
    //this.store.dispatch(searchItem(this.value));
  }
}

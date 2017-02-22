import { Component } from '@angular/core';

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
						  type="search" 
						  class="search-input" 
						  placeholder="Search" 
              name="searchInput" 
              (keyup.enter)="search()"
            />						
					</form>
				</div>
			</div>
		</div>
  `
})

export class JobCardSearch {

  search() {

  }

}

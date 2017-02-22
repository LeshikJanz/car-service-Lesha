import { Component } from '@angular/core';

@Component({
  selector: 'job-card-list-pager',
  template: `
		<li>
			<div>
				<button 
				  class="page-button" 
				  type="button" 
				  (click)="prev()" 
				  [class.disabled]="!HasPrev" 
				  [class.btn-primary]="HasPrev" 
				  [class.btn-default]="!HasPrev"
				>
          <i class="glyphicon glyphicon-arrow-left"></i>
        </button>
				<button 
				  class="page-button btn-primary" 
				  type="button" 
				  (click)="next()" 
				  [class.disabled]="!HasNext" 
				  [class.btn-primary]="HasNext"
					[class.btn-default]="!HasNext"
				>
          <i class="glyphicon glyphicon-arrow-right"></i>
        </button>
			</div>
		</li>
  `
})

export class JobCardListPager {

}

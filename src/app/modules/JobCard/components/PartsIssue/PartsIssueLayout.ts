import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'parts-issue-layout',
  template: `
    <div>
      <parts-issue-header></parts-issue-header>
      
      <parts-issue-body></parts-issue-body> 
      <!--<parts-issue-body></parts-issue-body> -->
    </div>
  `
})

export class PartsIssueLayout {

}

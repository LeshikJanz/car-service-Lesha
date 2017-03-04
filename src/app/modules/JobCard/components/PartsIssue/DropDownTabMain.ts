import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'drop-down-tab-main',
  template: `
    <div class="dropDownTabMain">
    <div class="drop-down-tab-button">
    <div [ngClass]="{'arrow-down': true, 'arrow-left': false}"></div>
    CC Code - Customer Concern Description 1
  </div>
    </div>  
`,
  styleUrls: [
    '../../styles/issue-body.css'
  ]
})

export class DropDownTabMain {

}
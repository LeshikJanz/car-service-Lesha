import {Component} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";

@Component({
  selector: 'drop-down-tab-main',
  template: `
<div>
    <div class="dropDownTabMain" (click)="openTab()">
    <div style="padding: 5px">
    <div class="arrow-white" [ngClass]="{'arrow-down-white': isOpen$, 'arrow-left-white': !isOpen$}"></div>
    {{mainTab.label}}
    </div>
    </div>
      <div *ngIf="isOpen$">
      <drop-down-tab-internal *ngFor="let internalTab of mainTab.internalTabs" [internalTab]="internalTab"></drop-down-tab-internal>
      </div>
    </div>
`,
  styleUrls: [
    '../../styles/issue-body.css'
  ]
})

export class DropDownTabMain {
  isOpen$: boolean = false;

  @Input()
  mainTab: Object;

  openTab() {
    this.isOpen$ = !this.isOpen$;
  }

}
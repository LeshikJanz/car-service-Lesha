import {Component} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";

@Component({
  selector: 'drop-down-tab-internal',
  template: `
<div>
    <div class="dropDownTabInternal" (click)="openTab()">
    <div style="padding: 5px 5px 5px 15px">
    <div [ngClass]="{'arrow-down': isOpen$, 'arrow-left': !isOpen$}"></div>
    {{internalTab.label}}
    </div>
    </div>
      <div *ngIf="isOpen$">
      <div *ngFor="let detail of internalTab.details">
        <drop-down-tab-item [detail]="detail"></drop-down-tab-item>
       </div>
    </div>
    <hr class="internal-tab-line">
    </div>
`,
  styleUrls: [
    '../../styles/issue-body.css',
    '../../styles/item.css'
  ]
})

export class DropDownTabInternal {
  isOpen$: boolean = false;

  @Input()
  internalTab: Object;

  openTab() {
    this.isOpen$ = !this.isOpen$;
  }

}
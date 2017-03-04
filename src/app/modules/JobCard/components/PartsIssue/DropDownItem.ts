import {Component} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";

interface IDetail {
  type: boolean,
  label: string,
  quantity: number,
  issued: number,
  qtyToIssue: number
}

@Component({
  selector: 'drop-down-tab-item',
  templateUrl: '../../templates/DropDownTabItem.html',
  styleUrls: [
    '../../styles/issue-body.css'
  ]
})

export class DropDownTabItem {
  isOpen$: boolean = false;

  @Input()
  detail: IDetail;

  openTab() {
    this.isOpen$ = !this.isOpen$;
  }

}
import { Component, Input } from '@angular/core';

@Component({
  selector: 'tab',
  template: `
  <div class="tab-content">
    <div [hidden]="!active" class="pane">
      <ng-content></ng-content>
    </div>
  </div>
  `
})
export class Tab {
  @Input('Title') title: string;
  @Input() active = false;
}
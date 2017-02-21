import { Component, ContentChildren, QueryList, 
    AfterContentInit, Output, EventEmitter } from '@angular/core';
import { Tab } from './tab';

@Component({
  selector: 'tabsContainer',
  template:`
    <ul class="nav nav-tabs nav-justified">
      <li *ngFor="let tab of tabs" (click)="activate(tab)" [class.active]="tab.active">
          <a data-toggle="tab">{{ tab.title }}</a>     
      </li>
    </ul>
    <ng-content></ng-content>
  `
})
export class TabsContainer implements AfterContentInit {
  @Output() selectedChange: EventEmitter<string> = 
    new EventEmitter<string>();
  @ContentChildren(Tab) tabs: QueryList<Tab>;
  
  ngAfterContentInit(): void {
      this.activate(this.tabs.first);
  }
  
  activate(tab: Tab): void{
    this.tabs.toArray().forEach(tab => tab.active = false);
    tab.active = true;
    this.selectedChange.emit(tab.title);
  }

}

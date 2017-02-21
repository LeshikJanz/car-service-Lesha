import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store';

import {
  toggleList,
  removeItem,
  restoreItems
} from './actions';

@Component({
  template: `
    <div>"Show" store value is: {{show$}}</div>
    <div>
      <button (click)="toggle()">Show list of items</button>
      <button *ngIf="show$" (click)="restore()">Restore removed items</button>
    </div>
    <div *ngIf="show$">
      <ul>
        <li *ngFor="let item of items$" (click)="remove(item.id)">
          <span>Item ID: {{item.id}}</span>,
          <span>Item Name: {{item.name}}</span>
        </li>
      </ul>
    </div>
  `
})

export class ExampleComponent {
  show$: Observable<boolean>;
  items$: Observable<any[]>;

  constructor(private store: Store<any>) {
    store
      .select('example')
      .subscribe(
        (state: any) => {
          this.show$ = state.show;
          this.items$ = state.items;
        }
      )
  }

  toggle() {
    this.store.dispatch(toggleList(!this.show$));
  }

  remove(id: number) {
    this.store.dispatch(removeItem(id));
  }

  restore() {
    this.store.dispatch(restoreItems());
  }
}

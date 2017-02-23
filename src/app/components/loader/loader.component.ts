import { Component, Input , OnInit } from '@angular/core';
import { LoaderService, LoaderEvent, LoaderEventType } from '../../services/loader.service';
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input() showLoader: boolean = true;
  showLoader$: Observable<boolean>;

  constructor(
    private _loaderService: LoaderService,
    private store: Store<any>
  ) {
    store
      .select('JobCard')
      .subscribe(
        (state: any) => this.showLoader$ = state.page.loading
      );
  }


  /**
   * Initialize application loader, listen to loader service.
   * 
   * 
   * @memberOf LoaderComponent
   */
  ngOnInit(): void {
    this._loaderService.eventEmitterInstance.subscribe((event: LoaderEvent) => {
      switch(event.type) {
        case LoaderEventType.VISIBLE:
          this.showLoader = event.value;
          break;
        default:
          break;
      }
    });
  }
}
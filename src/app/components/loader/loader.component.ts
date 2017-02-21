import { Component, Input , OnInit } from '@angular/core';
import { LoaderService, LoaderEvent, LoaderEventType } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input() showLoader: boolean = true;

  constructor(private _loaderService: LoaderService){}


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
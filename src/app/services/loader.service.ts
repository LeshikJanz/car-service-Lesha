import { Injectable, EventEmitter } from '@angular/core';

export enum LoaderEventType {
  VISIBLE
}

export class LoaderEvent {
  constructor(public type: LoaderEventType, public value:any) {}
}

@Injectable()
export class LoaderService {

  private _visible: boolean = true;

  private _eventEmitter: EventEmitter<LoaderEvent> = new EventEmitter<LoaderEvent>();

  constructor() {}
  

  /**
   * Event emitter service
   * 
   * @readonly
   * 
   * @memberOf LoaderService
   */
  get eventEmitterInstance() {
    return this._eventEmitter;
  }


  /**
   * Setter visible loader.
   * 
   * 
   * @memberOf LoaderService
   */
  set visible(value: boolean) {
    if ('undefined' !== typeof value && null !== value) {
      this._visible = value;
      this.emitEvent(new LoaderEvent(LoaderEventType.VISIBLE, this._visible));
    }
  }


  /**
   * Fire start loader event.
   * 
   * 
   * @memberOf LoaderService
   */
  public start() {
    // Make it visible for sure.
    this.visible = true;
  }


  /**
   * Complete loader event.
   * 
   * 
   * @memberOf LoaderService
   */
  public complete() {
    this.visible = false;
  }


  /**
   * Fire event.
   * 
   * @private
   * @param {LoaderEvent} event
   * @returns
   * 
   * @memberOf LoaderService
   */
  private emitEvent(event: LoaderEvent) {
    if (!this._eventEmitter) {
      console.debug('Event emitter is not defined!');
      return;
    }

    this._eventEmitter.next(event);
  }
}
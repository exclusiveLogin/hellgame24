import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class TopeventsService {
  private mainMenuToggleStateEvant: BehaviorSubject<boolean> = new BehaviorSubject(true);
  constructor() { }
  public getMenuEvent(): Observable<boolean> {
    return this.mainMenuToggleStateEvant.asObservable();
  }
  public setMenuState(state: boolean): void {
    this.mainMenuToggleStateEvant.next(state);
  }
}

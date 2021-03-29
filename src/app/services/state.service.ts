import { Injectable } from '@angular/core';

export interface IGlobalState {
  debug: boolean;
  updateTimeout: number;
}


@Injectable({providedIn: 'root'})
export class StateService {

  private state: IGlobalState = {
    debug: true,
    updateTimeout: 28000,
  };

  constructor() { }

  public getState(): IGlobalState {
    return this.state;
  }
}

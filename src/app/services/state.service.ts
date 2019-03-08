import { Injectable } from '@angular/core';

export interface IGlobalState{
  debug: boolean,
  updateTimeout: number,
}


@Injectable()
export class StateService {

  private state: IGlobalState = {
    debug: true,
    updateTimeout: 5000,
  }
  
  constructor() { }

  public getState(): IGlobalState {
    return this.state;
  }
}

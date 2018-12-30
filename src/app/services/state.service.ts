import { Injectable } from '@angular/core';
export interface IGlobalState{
  debug: boolean,
}


@Injectable()
export class StateService {

  private state: IGlobalState = {
    debug: true
  }
  constructor() { }

  public getState(): IGlobalState {
    return this.state;
  }
}

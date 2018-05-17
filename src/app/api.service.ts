import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ApiService {
  private MAINAPI = 'http://localhost/backend/';
  constructor() { }
  public getApi(): string {
    return this.MAINAPI;
  }
  public getApiRx(): Observable<string> {
    return Observable.of(this.MAINAPI);
  }
}

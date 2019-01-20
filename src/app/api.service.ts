import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ApiService {
  private MAINAPI = 'http://localhost/backend/';
  private RECIEPT_ICONS = 'assets/accessory/demo_pack/';
  private NATIVE_ICONS = 'assets/accessory/native/';
  private WIKI_IMAGE = 'assets/accessory/wiki/';

  constructor() { }

  public getApi(): string {
    return this.MAINAPI;
  }

  public getIconPath( type: string ){
    return type.toUpperCase()+'_ICONS';
  }

  public getImagePath( type: string ){
    return type.toUpperCase()+'_IMAGE';
  }

  public getIconPatRx( type: string ): Observable<string> {
    return Observable.of( type.toUpperCase()+'_ICONS' );
  }

  public getImagePathRx( type: string ): Observable<string> {
    return Observable.of( type.toUpperCase()+'_IMAGE' );
  }

  public getApiRx(): Observable<string> {
    return Observable.of(this.MAINAPI);
  }

}

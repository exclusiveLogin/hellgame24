import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable()
export class ApiService {
  private MAINAPI = 'https://hellgame24.ru/hgapi/';
  private RECIEPT_ICONS = 'assets/accessory/demo_pack/';
  private INGREDIENT_ICONS = 'assets/accessory/demo_pack/';
  private NATIVE_ICONS = 'assets/accessory/native/';
  private WIKI_IMAGE = 'assets/accessory/wiki/';

  constructor() { }

  public getApi(): string {
    return this.MAINAPI;
  }

  public getIconPath( type: string ) {
    return this[type.toUpperCase() + '_ICONS'];
  }

  public getImagePath( type: string ) {
    return this[type.toUpperCase() + '_IMAGE'];
  }

  public getWikiImagePath() {
    return this.WIKI_IMAGE;
  }

  public getWikiImagePathRx(): Observable<string> {
    return of( this.WIKI_IMAGE );
  }

  public getIconPathRx( type: string ): Observable<string> {
    return of( this[type.toUpperCase() + '_ICONS'] );
  }

  public getImagePathRx( type: string ): Observable<string> {
    return of( this[type.toUpperCase() + '_IMAGE'] );
  }

  public getApiRx(): Observable<string> {
    return of(this.MAINAPI);
  }

}

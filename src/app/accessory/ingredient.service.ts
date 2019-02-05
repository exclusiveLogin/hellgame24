import { Injectable } from '@angular/core';
import { Path } from '../models/path';
import { Observable } from 'rxjs';
import { ConnectorService, IParams } from '../services/connector.service';
import { tap } from 'rxjs/operators/tap';


export interface IIngredient{
  id: string,
  version: string,
  name: string,
  title: string,
  description: string,
  image_min: string,
  image_big: string,
  level: string,
  category_object: string,
  element: string,
  deploy_type: string,
  deploy_function: string,
  cat_icon: string,
  cat_title: string,
  cat_id: string,
  element_title: string,
}

export interface IRGO{
  id: string,
  object_id: string,
  creator_name: string,
  datetime_create: string,
  datetime_update: string,
}


@Injectable()
export class IngredientService {

  private path: Path = { segment: 'accessory', script: 'lib.php' };
  private itemCache: IIngredient[][] = [];

  constructor(
    private con: ConnectorService
  ) {
    console.log('IngedientService', this);
  }

  public getIngredientById( id: string ): Observable<IIngredient>{
    let params: IParams = {
      id,
      mode: 'byid'
    };

    if(this.itemCache[id]) return Observable.of(this.itemCache[id]);
    return this.con.getData<IIngredient>(this.path, params).pipe(tap(l => this.itemCache[id] = l[0])).map(list => list[0]);
  }

  public getIngredientbyName( name: string ): Observable<IIngredient>{
    let params: IParams = {
      name,
      mode: 'byname'
    };
    return this.con.getData<IIngredient>(this.path, params).map(list => list[0]);;
  }

  public getAllIngredients(): Observable<IIngredient[]>{
    let params: IParams = {
      mode: 'all'
    };
    return this.con.getData<IIngredient[]>(this.path, params);
  }

  public getAllUnlinkedRGO(): Observable<IRGO[]>{
    let params: IParams = {
      mode: 'unlinked_rgos'
    };
    return this.con.getData<IRGO[]>(this.path, params);
  }

}

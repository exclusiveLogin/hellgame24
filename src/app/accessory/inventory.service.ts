import { Injectable } from '@angular/core';
import { ConnectorService, IParams } from '../services/connector.service';
import { Path } from '../models/path';
import { ISlot } from './accessory-container/accessory-inventory/accessory-inventory.component';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class InventoryService {

  private slotsCache: ISlot[][] = [];

  private path:Path = {
    segment: 'accessory',
    script: 'inventory.php'
  };

  constructor(
    private con: ConnectorService
  ) {
    console.log( 'InventoryService:', this );
  }


  public getAllSlotsByUser( userId: string | number ){
    let params: IParams = { mode: 'slots_by_user', owner: userId };
    return this.con.getData<ISlot[]>(this.path, params).pipe(tap(slots => this.slotsCache[userId] = slots));
  }

  public getEmptySlotByUser( userId: string | number ): Observable<ISlot>{
    if (this.slotsCache[userId]) return Observable.of(this.slotsCache[userId].find((s: ISlot) => !s.rgo_id));

    let params: IParams = { mode: 'slots_by_user', owner: userId };
    return this.con.getData<ISlot[]>(this.path, params)
      .pipe(tap(slots => this.slotsCache[userId] = slots))
      .map((s: ISlot[]) => s.find(i => !i.rgo_id));

  }
  public clearCacheByUser(id){
    delete this.slotsCache[id];
  }

  public clearCache(){
    this.slotsCache = [];
  }

  public getIngredientsOfUser( userId: string, idIngredient: string ){
    if (this.slotsCache[userId]) return Observable.of(this.slotsCache[userId].filter((s: ISlot) => s.go_id && s.go_id.toString() === idIngredient.toString()));

    let params: IParams = { mode: 'slots_by_user', owner: userId };
    return this.con.getData<ISlot[]>(this.path, params)
      .pipe(tap(slots => this.slotsCache[userId] = slots))
      .map((slots: ISlot[]) => slots.filter(s => s.go_id && s.go_id.toString() === idIngredient.toString()));
  }
}

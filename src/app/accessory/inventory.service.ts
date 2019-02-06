import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConnectorService, IParams, IDataRequest } from '../services/connector.service';
import { Path } from '../models/path';
import { ISlot } from './accessory-container/accessory-inventory/accessory-inventory.component';
import { tap, filter, map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { IRecieptPartData } from './receipt.service';
import { IIngredient } from './ingredient.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class InventoryService {

  private slotsCache: ISlot[][] = [];
  private allSlotsCache: ISlot[] = [];

  private path:Path = {
    segment: 'accessory',
    script: 'inventory.php'
  };

  constructor(
    private con: ConnectorService,
    private auth: AuthService,
  ) {
    console.log( 'InventoryService:', this );
  }

  public getAllSlots(){
    if (this.allSlotsCache.length)
      return Observable.of(this.allSlotsCache);

    let params: IParams = { mode: 'all_slots' };
    return this.con.getData<ISlot[]>(this.path, params)
      .pipe(filter( slots => !!slots),tap(slots => this.allSlotsCache = [...slots]));

  }

  // получение слотов без владельца(drop нутые объекты)
  public getNonOwnerSlots(){
    if (this.allSlotsCache.length)
      return Observable.of(this.allSlotsCache.filter(s => !s.owner && !!s.rgo_id));

    return this.getAllSlots()
      .pipe(
        map(s => {
          return !!s && s.filter(i => !i.owner && !!i.rgo_id);
        })
      );

  }

  public getAllSlotsByUser( userId: string | number ){
    let params: IParams = { mode: 'slots_by_user', owner: userId };
    return this.con.getData<ISlot[]>(this.path, params).pipe(tap(slots => this.slotsCache[userId] = slots));
  }

  public getSlotByIdByUser( userId: string, slotId: string ): Observable<ISlot>{
    if (this.slotsCache[userId])
      return Observable.of(this.slotsCache[userId].find((s: ISlot) => s.id === slotId));

    return this.getAllSlotsByUser( userId ).map(slots => slots.find( s => s.id === slotId ));
  }

  public getSlotById( slotId: string ): Observable<ISlot>{
    if (this.allSlotsCache.length)
      return Observable.of(this.allSlotsCache.find((s: ISlot) => s.id === slotId));

    return this.getAllSlots().map(slots => slots.find( s => s.id === slotId ));
  }


  public getEmptySlotByUser( userId: string | number ): Observable<ISlot>{
    if (this.slotsCache[userId])
      return Observable.of(this.slotsCache[userId].find((s: ISlot) => !s.rgo_id));

    let params: IParams = { mode: 'slots_by_user', owner: userId };
    return this.con.getData<ISlot[]>(this.path, params)
      .pipe(tap(slots => this.slotsCache[userId] = slots))
      .map((s: ISlot[]) => s.find(i => !i.rgo_id));

  }

  public getEmptySlotsByUser( userId: string | number ): Observable<ISlot[]>{
    if (this.slotsCache[userId])
      return Observable.of(this.slotsCache[userId].filter((s: ISlot) => !s.rgo_id));

    let params: IParams = { mode: 'slots_by_user', owner: userId };
    return this.con.getData<ISlot[]>(this.path, params)
      .pipe(tap(slots => this.slotsCache[userId] = slots))
      .map((s: ISlot[]) => s.filter(i => !i.rgo_id));

  }

  public getNonEmptySlotsByUser( userId: string | number ){
    if (this.slotsCache[userId])
      return Observable.of(this.slotsCache[userId].filter((s: ISlot) => !!s.rgo_id));

    let params: IParams = { mode: 'slots_by_user', owner: userId };
    return this.con.getData<ISlot[]>(this.path, params)
      .pipe(tap(slots => this.slotsCache[userId] = [...slots]))
      .map((s: ISlot[]) => s.filter(i => !!i.rgo_id));
  }

  public getIngredientsOfUser( userId: string, idIngredient: string ){
    if (this.slotsCache[userId]) return Observable.of(this.slotsCache[userId].filter((s: ISlot) => s.go_id && s.go_id.toString() === idIngredient.toString()));

    let params: IParams = { mode: 'slots_by_user', owner: userId };
    return this.con.getData<ISlot[]>(this.path, params)
      .pipe(tap(slots => this.slotsCache[userId] = slots))
      .map((slots: ISlot[]) => slots.filter(s => s.go_id && s.go_id.toString() === idIngredient.toString()));
  }

  public craftNewInventoryItem( targetID: string, toSlot: string, recParts: IRecieptPartData[] ){
    if(targetID && toSlot){
      let data: IDataRequest = {
        body: {
          mode: 'create_new_rgo',
          object_id: targetID,
          slot: toSlot,
          creator_name: this.auth.authorizedAs()
        }
      }

      this.con.setData( this.path, data )
        .subscribe(() =>{

          let rxIngredients = forkJoin(...recParts.map((rp: IRecieptPartData) => {
            if( rp.quantity ){
                return this.getIngredientsOfUser( this.auth.authorizedAs(), rp.require_ingredient ).map(items => items.slice(0, Number(rp.quantity)));
            }
          }));

          rxIngredients.subscribe(result => {

            let flat: ISlot[] = [];
            result.forEach(slots => flat.push( ...slots ));

            flat.forEach(s => {
              this.con.getData(this.path, {mode: 'utilization_item', item_id: s.rgo_id }).subscribe();
              this.clearCache();
            });

          });

          alert('Предмет успешно создан');
        });
    }
  }

  public removeSlot( id: string ){
    let params: IParams = { mode: 'remove_slot', slot_id: id };

    this.con.getData(this.path, params).subscribe();

  }

  public creatNewSlotByUser(): Observable<ISlot> {
    let data: IDataRequest = {
      body: {
        mode: 'create_new_slot_by_user',
        owner: this.auth.authorizedAs()
      }
    }

    return <Observable<ISlot>> this.con.setData( this.path, data );

  }

  public utilizationRGO( id: string){
    let params: IParams = { mode: 'utilization_unlinked_rgo', item_id: id };
    this.con.getData( this.path, params ).subscribe();
  }

  public wrapRGOInSlot(){

  }

  public clearCacheByUser( id ){
    delete this.slotsCache[id];
  }

  public clearCache(){
    this.slotsCache = [];
    this.allSlotsCache = [];
  }

}

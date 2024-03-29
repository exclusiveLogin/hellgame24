import { forkJoin, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { IParams, IDataRequest } from '../services/connector.service';
import { Path } from '../models/path';
import { ISlot } from './accessory-container/accessory-inventory/accessory-inventory.component';
import { tap, filter, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { IRecieptPartData } from './receipt.service';
import { TopEventsService } from '../services/topevents.service';
import { ConnectorWrapperService } from '../services/connector-wrapper.service';

@Injectable()
export class InventoryService {

  private slotsCache: ISlot[][] = [];
  private allSlotsCache: ISlot[] = [];

  private path: Path = {
    segment: 'accessory',
    script: 'inventory.php'
  };

  constructor(
    private con: ConnectorWrapperService,
    private auth: AuthService,
    private tes: TopEventsService
  ) {
    console.log( 'InventoryService:', this );
    this.tes.getSegmentRefreshSignal( 'accessory' ).subscribe( s => this.clearCache());
  }

  public getAllSlots() {
    if (this.allSlotsCache.length) {
      return of(this.allSlotsCache);
    }

    const params: IParams = { mode: 'all_slots' };
    return this.con.getData<ISlot[]>(this.path, params)
      .pipe(filter( slots => !!slots), tap(slots => this.allSlotsCache = [...slots]));

  }

  // получение слотов без владельца(drop нутые объекты)
  public getNonOwnerSlots() {
    if (this.allSlotsCache.length) {
      return of(this.allSlotsCache.filter(s => !s.owner && !!s.rgo_id));
    }

    return this.getAllSlots()
      .pipe(
        map(s => {
          return !!s && s.filter(i => !i.owner && !!i.rgo_id && !i.spawn);
        })
      );

  }

  // получение слотов без владельца и без предмета (аномалии)
  public getNonOwnerEmptySlots() {
    if (this.allSlotsCache.length) {
      return of(this.allSlotsCache.filter(s => !s.owner && !s.rgo_id));
    }

    return this.getAllSlots()
      .pipe(
        map(s => {
          return !!s && s.filter(i => !i.owner && !i.rgo_id);
        })
      );

  }

  public getAllSlotsByUser( userId: string | number ) {
    const params: IParams = { mode: 'slots_by_user', owner: userId };
    return this.con.getData<ISlot[]>(this.path, params).pipe(tap(slots => this.slotsCache[userId] = slots));
  }

  public getSlotByIdByUser( userId: string, slotId: string ): Observable<ISlot> {
    if (this.slotsCache[userId]) {
      return of(this.slotsCache[userId].find((s: ISlot) => s.id === slotId));
    }

    return this.getAllSlotsByUser( userId ).pipe(
      map(slots => slots.find( s => s.id === slotId )));
  }

  public getSlotById( slotId: string ): Observable<ISlot> {
    if (this.allSlotsCache.length) {
      return of(this.allSlotsCache.find((s: ISlot) => s.id === slotId));
    }

    return this.getAllSlots().pipe(
      map(slots => slots.find( s => s.id === slotId )));
  }


  public getEmptySlotByUser( userId: string | number ): Observable<ISlot> {
    if (this.slotsCache[userId]) {
      return of(this.slotsCache[userId].find((s: ISlot) => !s.rgo_id));
    }

    const params: IParams = { mode: 'slots_by_user', owner: userId };
    return this.con.getData<ISlot[]>(this.path, params)
      .pipe(
        tap(slots => this.slotsCache[userId] = slots),
        map((s: ISlot[]) => s.find(i => !i.rgo_id))
      );
  }

  public getEmptySlotsByUser( userId: string | number ): Observable<ISlot[]> {
    if (this.slotsCache[userId]) {
      return of(this.slotsCache[userId].filter((s: ISlot) => !s.rgo_id));
    }

    const params: IParams = { mode: 'slots_by_user', owner: userId };
    return this.con.getData<ISlot[]>(this.path, params)
      .pipe(
          tap(slots => this.slotsCache[userId] = slots),
          map((s: ISlot[]) => s.filter(i => !i.rgo_id))
    );
  }

  public getNonEmptySlotsByUser( userId: string | number ) {
    if (this.slotsCache[userId]) {
      return of(this.slotsCache[userId].filter((s: ISlot) => !!s.rgo_id));
    }

    const params: IParams = { mode: 'slots_by_user', owner: userId };
    return this.con.getData<ISlot[]>(this.path, params)
      .pipe(
        tap(slots => this.slotsCache[userId] = [...slots]),
        map((s: ISlot[]) => s.filter(i => !!i.rgo_id)),
      );
  }

  public getIngredientsOfUser( userId: string, idIngredient: string ) {
    if (this.slotsCache[userId]) { return of(this.slotsCache[userId].filter((s: ISlot) => s.go_id && s.go_id.toString() === idIngredient.toString())); }

    const params: IParams = { mode: 'slots_by_user', owner: userId };
    return this.con.getData<ISlot[]>(this.path, params)
      .pipe(
        tap(slots => this.slotsCache[userId] = slots),
        map((slots: ISlot[]) => slots.filter(s => s.go_id && s.go_id.toString() === idIngredient.toString())),
      );
  }

  public craftNewInventoryItem( targetID: string, toSlot: string, recParts: IRecieptPartData[] ) {
    if (targetID && toSlot) {
      const data: IDataRequest = {
        body: {
          mode: 'craft_new_item',
          object_id: targetID,
          slot: toSlot,
          creator_name: this.auth.authorizedAs()
        }
      };

      this.con.setData( this.path, data )
        .subscribe(() => {

          const rxIngredients = forkJoin([...recParts.map((rp: IRecieptPartData) => {
            if ( rp.quantity ) {
                return this.getIngredientsOfUser( this.auth.authorizedAs(), rp.require_ingredient ).pipe(
                  map(items => items.slice(0, Number(rp.quantity)))
                );
            }
          })]);

          rxIngredients.subscribe(result => {

            const flat: ISlot[] = [];
            result.forEach(slots => flat.push( ...slots ));

            flat.forEach(s => {
              // this.con.getData(this.path, {mode: 'utilization_item', item_id: s.rgo_id }).subscribe();
              this.utilizationInventoryItem( s.rgo_id ).subscribe();
            });

            this.clearCache();
          });

          alert('Предмет успешно создан');
        });
    }
  }

  public spawnNewItem( objectId: string ) {
    if ( objectId ) {
      const data: IDataRequest = {
        body: {
          mode: 'spawn_new_rgo',
          object_id: objectId,
        }
      };
      this.clearCache();
      return this.con.setData( this.path, data );
    }
  }

  public removeSlot( id: string ) {
    const req: IDataRequest = {
      body: {
        mode: 'remove_slot',
        slot_id: id,
      }
    };

    this.clearCache();
    return this.con.setData(this.path, req);
  }

  public creatNewSlotByUser(): Observable<ISlot> {
    const data: IDataRequest = {
      body: {
        mode: 'create_new_slot_by_user',
        owner: this.auth.authorizedAs()
      }
    };

    this.clearCache();
    return <Observable<ISlot>> this.con.setData( this.path, data );

  }

  public utilizationRGO( id: string ) {
    const data: IDataRequest = {
      body: { mode: 'utilization_rgo', item_id: id }
    };

    return this.con.setData( this.path, data );
  }

  public utilizationInventoryItem( id: string ) {
    const data: IDataRequest = {
      body: { mode: 'utilization_item', item_id: id }
    };

    this.clearCache();
    return this.con.setData( this.path, data );
  }

  public wrapRGOInSlot( rgoId: string ) {

    const data: IDataRequest = {
      body: { mode: 'wrap_rgo_in_slot', item_id: rgoId }
    };

    this.clearCache();
    return this.con.setData( this.path, data );
  }

  public dropItemFromInventory( slotId: string ) {
    const data: IDataRequest = {
      body: {
        mode: 'drop_item',
        slot_id: slotId
      }
    };
    this.clearCache();
    return this.con.setData( this.path, data );
  }

  public grindItemInSlot( slotId: string ) {
    const data: IDataRequest = {
      body: {
        mode: 'grind_item',
        owner: this.auth.authorizedAs(),
        slot_id: slotId
      }
    };

    this.clearCache();
    return this.con.setData( this.path, data );
  }

  public grindItemFromSpawn( slotId: string, spawnId: string ) {
    const data: IDataRequest = {
      body: {
        mode: 'grind_item',
        owner: this.auth.authorizedAs(),
        slot_id: slotId,
        spawn_id: spawnId
      }
    };

    this.clearCache();
    return this.con.setData( this.path, data );
  }

  public clearCacheByUser( id ) {
    delete this.slotsCache[id];
  }

  public clearCache() {
    this.slotsCache = [];
    this.allSlotsCache = [];
  }

}

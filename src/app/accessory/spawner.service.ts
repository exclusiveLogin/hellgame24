import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ConnectorService, IParams, IDataRequest, IDataResponse } from '../services/connector.service';
import { Path } from '../models/path';
import { Observable } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';
import { InventoryService } from './inventory.service';
import { ConnectorWrapperService } from '../services/connector-wrapper.service';

export interface ISpawn{
  id: string,
  armed_slot_id: string,
  object_id: string,
  emitter_id: string,
  position_lat: string,
  position_lon: string,
  last_emit: string,
}

@Injectable()
export class SpawnerService {

  private spawnCache: ISpawn[] = [];

  private path:Path = {
    segment: 'accessory',
    script: 'spawner.php'
  };

  constructor(
    private con: ConnectorWrapperService,
    private inventory: InventoryService,
  ) {
    console.log('SpawnService ', this);
   }

  public getAllSpawn(): Observable<ISpawn[]>{
    let params: IParams = {
      mode: 'get_all_spawn'
    };
    return this.con.getData<ISpawn[]>( this.path, params )
      .pipe(
        filter(s => !!s),
        tap((s: ISpawn[]) => this.spawnCache = [...s]),
        );
  }

  public getSpawnerById( id: string ): Observable<ISpawn>{
    if(!id) return;
    if(this.spawnCache && this.spawnCache.find((spawn: ISpawn) => spawn.id.toString() === id.toString()))
      return Observable.of(this.spawnCache.find((spawn: ISpawn) => spawn.id.toString() === id.toString()));

    return this.getAllSpawn()
      .pipe(
        filter(s => !!s),
        tap((s: ISpawn[]) => this.spawnCache = [...s]),
        map((s: ISpawn[]) => s.find(sp => sp.id.toString() === id.toString()))
        )
  }

  public spawnObjectByID( id: string): Observable<IDataResponse>{
    let req: IDataRequest = {
      body: {
        mode:'id',
        id
      }
    }

    this.clearCache();
    this.inventory.clearCache();
    return this.con.setData( this.path, req);
  }

  public clearCache(){
    this.spawnCache = [];
  }
}

import { Injectable } from '@angular/core';
import { ConnectorService, IParams } from '../services/connector.service';
import { Path } from '../models/path';
import { ISlot } from './accessory-container/accessory-inventory/accessory-inventory.component';

@Injectable()
export class InventoryService {

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
    return this.con.getData<ISlot[]>(this.path, params);
  }
}

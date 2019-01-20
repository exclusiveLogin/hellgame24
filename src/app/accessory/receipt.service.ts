import { Injectable } from '@angular/core';
import { ConnectorService, IDataRequest, IParams } from '../services/connector.service';
import { ApiService } from '../api.service';
import { Path } from '../models/path';
import { IUser } from '../models/user-interface';


export interface IRecieptPartData{
  id:string,
  target: string,
  require_item: string,
  require_ingredient: string,
  comment: string,
  quantity: string,
}

export interface IRecieptList{
  target: string,
}
@Injectable()
export class ReceiptService {

  private path: Path = { segment: 'accessory', script: 'reciept.php' };

  constructor(
    private con: ConnectorService,
  ) {
    console.log('RecieptService:', this);
  }

  public getAllRecieptList(){
    let params: IParams = { mode: 'list'};
    return this.con.getData<IRecieptList[]>(this.path, params);
  }

  public getRecieptListByUser( user: IUser){
    let params: IParams = { mode: 'byuser', user: user.login };
    return this.con.getData<IRecieptPartData[]>(this.path, params);
  }

  public getRecieptParts( idTarget: string | number ){
    if( typeof idTarget !== 'string') idTarget = idTarget.toString();
    let params: IParams = { mode: 'bytarget', target: idTarget };
    return this.con.getData<IRecieptPartData[]>(this.path, params);
  }

}

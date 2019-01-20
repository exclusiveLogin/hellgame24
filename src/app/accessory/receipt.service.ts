import { Injectable } from '@angular/core';
import { ConnectorService, IDataRequest, IParams } from '../services/connector.service';


interface IRecieptPartData{
  id:string,
  target: string,
  require_item: string,
  require_ingredient: string,
  comment: string,
  quantity: string,
}

interface IRecieptList{
  target: string,
}
@Injectable()
export class ReceiptService {

  constructor(
    private con: ConnectorService
  ) {
    console.log('RecieptService:', this);
  }

  public getAllRecieptList(){
    let params: IParams = {mode: 'list'};

  }

  public getRecieptListByUser(){

  }

  public getRecieptParts( id: string ){

  }

}

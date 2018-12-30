import { Injectable } from '@angular/core';
import { Path } from '../models/path';
import { Observable } from 'rxjs';


export interface IDataResponse{

};

export interface IDataRequest{

};


@Injectable()
export class ConnectorService {

  constructor() { }

  public getData(path: Path, params:[]|string): Observable<IDataResponse> {

    return Observable.of({});
  } 

  public setData(path: Path, data: IDataRequest ): Observable<IDataResponse> {
    
    return Observable.of({});
  } 
}

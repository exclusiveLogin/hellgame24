import { Injectable } from '@angular/core';
import { Path } from '../models/path';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { tap } from 'rxjs/operators/tap';


export interface IDataResponse{

};

export interface IDataRequest{
  params?: any,
  body?: any
};


@Injectable()
export class ConnectorService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private api: ApiService,
  ) { }

  public getData(path: Path, params?: any): Observable<IDataResponse> {
    return this.http.get(`${this.api.getApi()}${path.segment}/${path.script}`, { params })
    .pipe(
      tap(htr => {console.log('htr get:', htr)})
    );
  } 

  public setData(path: Path, data: IDataRequest ): Observable<IDataResponse> {
    let dbody: IDataRequest = data.body || {};
    dbody['author'] = this.auth.authorizedAs();
    return this.http.post(`${this.api.getApi()}${path.segment}/${path.script}`, dbody,
    {
      params: data.params
    }).pipe(
      tap(htr => {console.log('htr set:', htr)})
    );
  } 
}
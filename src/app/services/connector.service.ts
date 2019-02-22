import { Injectable } from '@angular/core';
import { Path } from '../models/path';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { tap } from 'rxjs/operators/tap';
import { UpdaterService } from '../updater.service';


export interface IDataResponse{

};

export interface IParams {
  [name: string]: any
}
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
    private updater: UpdaterService,
  ) { }

  public getData<T>(path: Path, params?: IParams): Observable<T> {
    return this.http.get<T>(`${this.api.getApi()}${path.segment}/${path.script}`, { params })
    .pipe(
      tap(htr => {console.log('htr get:', htr)})
    );
  }

  public setData(path: Path, data: IDataRequest ): Observable<IDataResponse> {
    path.segment && this.updater.updateSegment( path.segment );
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

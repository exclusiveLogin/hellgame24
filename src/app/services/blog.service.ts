import { Injectable } from '@angular/core';
import { IService } from '../models/services-interface';
import { IDataRequest, IParams } from './connector.service';
import { Path } from '../models/path';
import { Observable } from 'rxjs';
import { IMessangerData } from '../dashboard/messanger/messanger.component';
import { AuthService } from './auth.service';
import { ConnectorWrapperService } from './connector-wrapper.service';
import { tap } from 'rxjs/operators';



export interface IBlogData {
  title?: string;
  text_field?: string;
  datetime?: string;
  author?: string;
  id?: string;
}

@Injectable({providedIn: 'root'})
export class BlogService implements IService {

  private path: Path = {
    segment: 'blog',
    script: 'bloghandler.php',
  };

  constructor(
    private con: ConnectorWrapperService,
    private auth: AuthService
  ) { }

  public getData<T>(params?: IParams) {
    console.log('blog service getData', params);
    return this.con.getData(this.path, params) as Observable<T>;
  }

  private convertMessage2Request( msg: IMessangerData ): IBlogData {
    const req: IBlogData = Object.assign(msg, { text_field: msg.text }, {author: this.auth.authorizedAs()});
    return req;
  }

  public setData( data: any ) {
    const _data = this.convertMessage2Request( data );
    const request: IDataRequest = {
      body: _data
    };

    return this.con.setData(this.path, request)
      .pipe(
        tap( result => console.log('devss result: ', result))
      );
  }

}

import { Injectable } from '@angular/core';
import { IService } from '../models/services-interface';
import { ConnectorService, IDataRequest, IParams } from './connector.service';
import { Path } from '../models/path';
import { Observable } from 'rxjs';
import { IMessangerData } from '../dashboard/messanger/messanger.component';
import { tap } from 'rxjs/operators/tap';



export interface IBlogData{
  title?: string,
  text_field?: string,
  datetime?: string,
  author?: string,
  id?:string,
}

@Injectable()
export class BlogService implements IService {

  private path: Path = {
    segment: 'blog',
    script: 'bloghandler.php',
  };

  constructor(
    private con: ConnectorService
  ) { }

  public getData<T>(params?: IParams){
    console.log('blog service getData', params);
    return this.con.getData(this.path, params) as Observable<T>;
  }

  private convertMessage2Request( msg: IMessangerData ): IBlogData {
    let req: IBlogData = Object.assign(msg, { text_field: msg.text });
    return req;
  }

  public setData( data: any ){
    let _data = this.convertMessage2Request( data );
    let request: IDataRequest = {
      body:_data
    };

    return this.con.setData(this.path, request)
      .pipe(
        tap( result => console.log('devss result: ', result))
      );
  }

}

import { Injectable } from '@angular/core';
import { Path } from '../models/path';
import { ConnectorService, IDataRequest } from './connector.service';
import { IMessangerData } from '../dashboard/messanger/messanger.component';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';
import { UiService } from './ui.service';



export interface IMessageData{
  subject?: string,
  text_field?: string,
  datetime?: string,
  author?: string,
  to_user?: string,
  id?:string,
  readed?: boolean,
}

@Injectable()
export class MessageService {
  private path: Path = {
    segment: 'message',
    script: 'messagehandler.php',
  };

  constructor(
      private con: ConnectorService,
      private ui: UiService
    ) { }

    public getData<T>(params?: any){
      console.log('message service getData', params);
      return this.con.getData(this.path, params) as Observable<T>;
    }

    private convertMessage2Request( msg: IMessangerData ): IMessageData {
      let req: IMessageData = Object.assign(msg, {text_field: msg.text, subject:msg.title, to_user: this.ui.getCurrentUserSelect().login});
      return req;
    }

    public setData( data: any ){
      let _data = this.convertMessage2Request( data );
      let request: IDataRequest = {
        body:Object.assign(_data, {operation: 'add'})
      };
      if(confirm("Вы уверены что хотите отправить сообщение пользователю: "+_data.to_user+" ?"))
      return this.con.setData(this.path, request)
        .pipe(
          tap( result => console.log('devss messages result: ', result))
        );
    }

    public markData(id: string, field: string, flag: string){
      let request: IDataRequest = {
        body:{
          id,
          operation: 'mark',
          field,
          flag,
        }
      };

      return this.con.setData(this.path, request)
      .pipe(
        tap( result => console.log('devss mark result: ', result))
      );
    }

}

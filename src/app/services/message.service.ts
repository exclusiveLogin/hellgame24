import { Injectable } from '@angular/core';
import { Path } from '../models/path';
import { IDataRequest, IParams } from './connector.service';
import { IMessangerData } from '../dashboard/messanger/messanger.component';
import { UiService } from './ui.service';
import { AuthService } from './auth.service';
import { ConnectorWrapperService } from './connector-wrapper.service';
import { tap } from 'rxjs/operators';



export interface IMessageData {
  subject?: string;
  text_field?: string;
  datetime?: string;
  author?: string;
  to_user?: string;
  id?: string;
  readed?: boolean;
}

@Injectable()
export class MessageService {
  private path: Path = {
    segment: 'message',
    script: 'messagehandler.php',
  };

  constructor(
      private con: ConnectorWrapperService,
      private ui: UiService,
      private auth: AuthService
    ) { }

    public getData(params?: IParams) {
      console.log('message service getData', params);
      return this.con.getData<IMessageData[]>(this.path, params);
    }

    private convertMessage2Request( msg: IMessangerData ): IMessageData {
      const req: IMessageData = Object.assign(msg, {text_field: msg.text, subject: msg.title, to_user: this.ui.getCurrentUserSelect().login});
      return req;
    }

    public setData( data: any ) {
      const _data = this.convertMessage2Request( data );
      const request: IDataRequest = {
        body: Object.assign(_data, {operation: 'add'}, { author: this.auth.authorizedAs() })
      };
      if (confirm('Вы уверены что хотите отправить сообщение пользователю: ' + _data.to_user + ' ?')) {
      return this.con.setData(this.path, request)
        .pipe(
          tap( result => console.log('devss messages result: ', result))
        );
      }
    }

    public markData( id: string, field: string, flag: string | boolean ) {
      const request: IDataRequest = {
        body: {
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

    public removeData( id: string ) {
      const request: IDataRequest = {
        body: {
          id,
          operation: 'remove',
        }
      };

      return this.con.setData(this.path, request)
      .pipe(
        tap( result => console.log('devss remove result: ', result))
      );
    }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGlobalState } from './models/global-state-interface';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { Path } from './models/path';
import { ConnectorService, IDataRequest } from './services/connector.service';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

let path: Path = {
  segment: 'state',
  script: 'state_handler.php'
};

@Injectable()
export class GlobalService {
  public glState = new Subject<IGlobalState>();

  constructor(
    private con: ConnectorService,
    private auth: AuthService,
  ) { }

  public getState(): Observable<IGlobalState> {
    return this.con.getData<IGlobalState>( path ).map( state => !!state && !!state[0] ? state[0] : [] );
  }
  
  public setGlobalStatus(global_code: string, msg: string = ""): Observable<IGlobalState> {
    let data: IDataRequest = {
      body: {
        mode: "add_state",
        global_code,
        login: this.auth.authorizedAs(),
        message: msg
      }
    };

    return this.con.setData<IGlobalState>( path, data).pipe(tap((state) => !!state && this.updateGlobalState( state )));
  }

  public getGlobalState(){
    return this.glState.asObservable();
  }

  public updateGlobalState(state: any): void{
    this.glState.next(state);
  }
}

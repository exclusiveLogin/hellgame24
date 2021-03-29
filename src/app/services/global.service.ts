import { Injectable } from '@angular/core';
import { IGlobalState } from '../models/global-state-interface';
import { Observable, Subject } from 'rxjs';
import { Path } from '../models/path';
import { IDataRequest, IParams } from './connector.service';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs/operators';
import { ConnectorWrapperService } from './connector-wrapper.service';

const path: Path = {
  segment: 'state',
  script: 'state_handler.php'
};

@Injectable({providedIn: 'root'})
export class GlobalService {
  public glState = new Subject<IGlobalState>();

  constructor(
    private con: ConnectorWrapperService,
    private auth: AuthService,
  ) { }

  public getState(): Observable<IGlobalState> {
    return this.con.getData<IGlobalState>( path ).pipe(
        map( state => !!state && !!state[0] ? state[0] : [] ),
      );
  }

  public getStates( user: string, skip: number = null ): Observable<IGlobalState[]> {

    const params: IParams = skip ? {
      login: user,
      limit: 10,
      skip
    } : {
      login: user,
      limit: 10
    };

    return this.con.getData<IGlobalState[]>( path, params );
  }

  public setGlobalStatus(global_code: string, msg: string = ''): Observable<IGlobalState> {
    const data: IDataRequest = {
      body: {
        mode: 'add_state',
        global_code,
        login: this.auth.authorizedAs(),
        message: msg
      }
    };

    return this.con.setData<IGlobalState>( path, data ).pipe(
      tap((state) => !!state && this.updateGlobalState( state ))
      );
  }

  public getGlobalState() {
    return this.glState.asObservable();
  }

  public updateGlobalState( state: any ): void {
    this.glState.next( state );
  }
}

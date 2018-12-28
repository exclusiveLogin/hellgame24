import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { IGlobalState } from './models/global-state-interface';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class GlobalService {
  public glState = new Subject<IGlobalState>();

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private api: ApiService,
  ) { }

  public getState(): Observable<IGlobalState> {
    const api: string = this.api.getApi();
    return this.http.get<IGlobalState>(api + 'global_state.php');
  }
  
  public setGlobalStatus(code: string, msg?: string): Observable<IGlobalState> {
    const api: string = this.api.getApi();
    return this.http.get<IGlobalState>(api + 'global_state.php', {
      params:{
        global_status: code,
        global_message: msg || '',
      }
    });
  }

  public getGlobalState(){
    return this.glState;
  }

  public updateGlobalState(state: any): void{
    this.glState.next(state);
  }
}

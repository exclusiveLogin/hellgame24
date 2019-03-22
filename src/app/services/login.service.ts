import { Injectable } from '@angular/core';
import { Path } from '../models/path';
import { ConnectorService } from './connector.service';
import { UpdaterService } from './updater.service';

const path: Path = {
  segment: 'login',
  script: 'loginhandler.php'
};

interface ILoginCacheItem {
  id: string,
  login: string,
  battery: string,
  position_lat: string,
  position_lon: string,
  network_equal: string,
  dlink: string,
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginCache: ILoginCacheItem[] = [];

  private inProgress: boolean;
  private recursion: boolean;

  private cb: () => void;

constructor(
  private con: ConnectorService,
  private updater: UpdaterService
) { 
  console.log("LOGIN SERVICE", this);
}

public setNewLoginData( login: string, battery?:number, nav?: Position){

  this.recursion = !!this.inProgress;

  if ( !!this.recursion ) this.cb = () => this.setNewLoginData( login, battery, nav); 

  const cached = this.loginCache[ login ];

  if( cached ) {
    this.setExistLoginData( cached.id, login, battery, nav );
    return;
  }

  const body = {
    login, mode:'add_login',
    user_agent: navigator.userAgent,
    battery: battery && battery * 100,
    position_lat: nav && nav.coords && nav.coords.latitude,
    position_lon: nav && nav.coords && nav.coords.longitude,
    accuracy: nav && nav.coords && nav.coords.accuracy,
  }
  
  if( !this.inProgress ) this.con.setData( path, {body}).subscribe( ( r: ILoginCacheItem ) => {
    this.loginCache[login] =  r;
    this.inProgress = false;
    if( !!this.cb && this.recursion ) {
      this.cb();
      delete this.cb;
    }
  this.updater.updateSegment('status');
  } );

  this.inProgress = true; 
}

public setExistLoginData( lastId:string, login: string, battery?:number, nav?: Position){

  const body = {
    last_id: lastId,
    login,
    mode:'add_login',
    battery: battery && battery * 100,
    position_lat: nav && nav.coords && nav.coords.latitude,
    position_lon: nav && nav.coords && nav.coords.longitude,
    accuracy: nav && nav.coords && nav.coords.accuracy,
  }
  
  this.con.setData( path, {body}).subscribe();
}

public resetLoginCahce(){ 
  if (!!this.loginCache ) this.loginCache = [];

}

public getLastLogin( login: string) {

}

public getListLogin( login: string ){

}

public getLoginCache(): ILoginCacheItem[] {
  return this.loginCache;
}

}

import { Injectable } from '@angular/core';
import { ConnectorService } from './services/connector.service';
import { AuthService } from './auth.service';
import { IUser } from './models/user-interface';
import { Path } from './models/path';


export interface IUXEvent{
    mode: string,
    title: string,
	author?: string,
	segment?: string,
	level?: string,
	description?: string
}

let path: Path = {
    segment: 'events',
    script: 'events_handler.php'
}

@Injectable()
export class UxEventerService {

constructor(
    private con: ConnectorService,
) { }

public setLoginEvent( user: IUser ){
    let body: IUXEvent =  {
        title: `Пользователь ${user.name}(${user.login}) вошел в систему HG24`,
        description: 'Для подробностей можете посетить сайт игры Hellgame24',
        author: user.login,
        level:'info',
        mode: 'add_event'
    }
    
    this.con.setData( path, { body }).subscribe();
}

public setLogoutEvent( user: IUser ){
    let body: IUXEvent =  {
        title: `Пользователь ${user.name}(${user.login}) вышел из системы HG24`,
        description: 'Ждем вновь на сайте игры Hellgame24',
        author: user.login,
        level:'info',
        mode: 'add_event'
    }
    
    this.con.setData( path, { body }).subscribe();
}

}

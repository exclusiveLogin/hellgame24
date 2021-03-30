import {Injectable} from '@angular/core';
import {IUser} from '../models/user-interface';
import {Path} from '../models/path';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';


export interface IUXEvent {
    mode: string;
    title: string;
    author?: string;
    segment?: string;
    level?: string;
    description?: string;
}

const path: Path = {
    segment: 'events',
    script: 'events_handler.php'
};

@Injectable({providedIn: 'root'})
export class UxEventerService {

    constructor(
        private api: ApiService,
        private http: HttpClient
    ) {
    }

    public setLoginEvent(user: IUser) {
        if (user.silent) {
            return;
        }
        const body: IUXEvent = {
            title: `Пользователь ${user.name}(${user.login}) вошел в систему HG24`,
            description: 'Для подробностей можете посетить сайт игры Hellgame24',
            author: user.login,
            level: 'info',
            mode: 'add_event'
        };

        this.updateEvent(body);
    }

    public setLogoutEvent(user: IUser) {
        if (user.silent) {
            return;
        }
        ;
        const body: IUXEvent = {
            title: `Пользователь ${user.name}(${user.login}) вышел из системы HG24`,
            description: 'Ждем вновь на сайте игры Hellgame24',
            author: user.login,
            level: 'info',
            mode: 'add_event'
        };

        this.updateEvent(body);
    }

    public setLoginErrorEvent(login: string) {
        const body: IUXEvent = {
            title: `Неудачная попытка входа за пользователя с логином ${login}`,
            description: 'Если это не Вы Просьба сообщить администратору Hellgame24',
            author: 'system',
            level: 'error',
            mode: 'add_event'
        };

        this.updateEvent(body);
    }

    public setUserEmo(user: IUser, emo: number, title?: string) {
        if (user.silent) {
            return;
        }
        const body: IUXEvent = {
            title: `Пользователь ${user.login} установил настроение`,
            description: `Новое настроение: ${emo}, ( ${title} )`,
            author: 'system',
            level: 'info',
            mode: 'add_event'
        };

        this.updateEvent(body);
    }

    public setUserStatus(user: IUser, status: string) {
        if (user.silent) {
            return;
        }
        const body: IUXEvent = {
            title: `Пользователь ${user.login} установил новый статус`,
            description: `Статус: ${status}`,
            author: 'system',
            level: 'info',
            mode: 'add_event'
        };

        this.updateEvent(body);
    }

    public setRedCode(user: IUser, description?: string) {
        if (user.silent) {
            return;
        }
        const body: IUXEvent = {
            title: `Пользователь ${user.login} установил Красный код`,
            description: `${description ? 'По причине: ' + description : ' Без объяснения причины'}`,
            author: 'system',
            level: 'danger',
            mode: 'add_event'
        };

        this.updateEvent(body);
    }

    public setOrangeCode(user: IUser, description?: string) {
        if (user.silent) {
            return;
        }
        const body: IUXEvent = {
            title: `Пользователь ${user.login} установил Оранжевый код`,
            description: `${description ? 'По причине: ' + description : ' Без объяснения причины'}`,
            author: 'system',
            level: 'warning',
            mode: 'add_event'
        };

        this.updateEvent(body);
    }

    public setGreenCode(user: IUser) {
        if (user.silent) {
            return;
        }
        const body: IUXEvent = {
            title: `Пользователь ${user.login} снял код опасности`,
            description: `Опасность миновала, однако стоит помнить о правилах и технике безопасности. Будьте бдительны и аккуратны, это залог выживания`,
            author: 'system',
            level: 'info',
            mode: 'add_event'
        };

        this.updateEvent(body);
    }

    private updateEvent(body) {
        setTimeout(() => {
            this.http.post(`${this.api.getApi()}${path.segment}/${path.script}`, body).subscribe();
        }, 250);
    }
}

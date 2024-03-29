import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import {IMenustate, MenuStateInterface} from '../models/menu-state-interface';

@Injectable({providedIn: 'root'})
export class TopEventsService {
    private mainMenuToggleStateEvent: BehaviorSubject<boolean> = new BehaviorSubject(true);

    private menuUpdateState: BehaviorSubject<MenuStateInterface> = new BehaviorSubject<MenuStateInterface>({
        dashboard_upd: false,
        meteo_upd: false,
        news_upd: false,
        settings_upd: false,
        map_upd: false
    });

    private segmentsNeedRefresh = {
        blog: new BehaviorSubject<boolean>(false),
        message: new BehaviorSubject<boolean>(false),
        usermail: new BehaviorSubject<boolean>(false),
        inventory: new BehaviorSubject<boolean>(false),
        demo: new BehaviorSubject<boolean>(false),
        reciepts: new BehaviorSubject<boolean>(false),
        menu: new BehaviorSubject<boolean>(false),
        accessory: new BehaviorSubject<boolean>(false),
        status: new BehaviorSubject<boolean>(false),
        emo: new BehaviorSubject<boolean>(false),
        state: new BehaviorSubject<boolean>(false),
        stable: new BehaviorSubject<boolean>(false),
        login: new BehaviorSubject<string>(null),
        global: new BehaviorSubject<boolean>(false),
    };

    constructor() {

    }

    public getMenuEvent(): Observable<boolean> {
        return this.mainMenuToggleStateEvent.asObservable();
    }

    public setMenuState(state: boolean): void {
        this.mainMenuToggleStateEvent.next(state);
    }

    public getMenuState(): BehaviorSubject<MenuStateInterface> {
        return this.menuUpdateState;
    }

    public setMenuStateUpdates(newstate: IMenustate): void {
        const _oldval = this.menuUpdateState.getValue();
        _oldval.dashboard_upd = (newstate['dashboard_upd']) ? newstate['dashboard_upd'] : _oldval.dashboard_upd;
        _oldval.settings_upd = (newstate['settings_upd']) ? newstate['settings_upd'] : _oldval.settings_upd;
        _oldval.news_upd = (newstate['news_upd']) ? newstate['news_upd'] : _oldval.news_upd;
        _oldval.meteo_upd = (newstate['meteo_upd']) ? newstate['meteo_upd'] : _oldval.meteo_upd;
        _oldval.map_upd = (newstate['map_upd']) ? newstate['map_upd'] : _oldval.map_upd;
        this.menuUpdateState.next(_oldval);
    }

    public getSegmentRefreshSignal(segment: string): BehaviorSubject<any> {
        return this.segmentsNeedRefresh[segment];
    }

    public refreshSegment(segment: string): void {
        const targetSegment = this.segmentsNeedRefresh[segment];
        targetSegment?.next(true);
    }

    public refreshSegmentWithData(segment: string, data: any) {
        const targetSegment = this.segmentsNeedRefresh[segment];
        targetSegment?.next(data);
    }
}

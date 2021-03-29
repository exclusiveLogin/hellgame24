import {Injectable} from '@angular/core';
import {ConnectorWrapperService} from '../services/connector-wrapper.service';
import {Observable} from 'rxjs/Observable';
import {Path} from 'app/models/path';
import {IParams} from 'app/services/connector.service';
import {map} from 'rxjs/operators';
import {IUnit, IUnitResponse, Unit} from 'app/models/unit.model';

@Injectable({providedIn: 'root'})
export class UnitsService {

    path: Path = {
        segment: 'units',
        script: 'units_handler.php',
    };

    constructor(private con: ConnectorWrapperService) {
    }

    getAllUnits(): Observable<Unit[]> {
        const params: IParams = {
            mode: 'get_all_units'
        };

        return this.con.getData<IUnitResponse[]>(this.path, params).pipe(
            map((jsons) => jsons.map(json => new Unit(json))));

    }

    getAllUnitsByLevel(level: number): Observable<IUnit[]> {
        const params: IParams = {
            mode: 'get_units_by_level',
            level,
        };

        return this.con.getData<IUnitResponse[]>(this.path, params).pipe(
            map((jsons) => jsons.map(json => new Unit(json))));

    }

    getAllUnitsByStatus(status: string): Observable<IUnit[]> {
        const params: IParams = {
            mode: 'get_units_by_level',
            status,
        };

        return this.con.getData<IUnitResponse[]>(this.path, params).pipe(
            map((jsons) => jsons.map(json => new Unit(json))));

    }

    getAllActiveUnits(): Observable<IUnit[]> {
        const params: IParams = {
            mode: 'get_active_units',
        };

        return this.con.getData<IUnitResponse[]>(this.path, params).pipe(
            map((jsons) => jsons.map(json => new Unit(json))));

    }
}

import { Injectable } from '@angular/core';
import { ConnectorService, IParams, IDataResponse, IDataRequest } from './connector.service';
import { UpdaterService } from './updater.service';
import { Path } from '../models/path';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ConnectorWrapperService {

    constructor(
        private con: ConnectorService,
        private updater: UpdaterService,
    ) { }

    public getData<T>(path: Path, params?: IParams): Observable<T> {
        return this.con.getData(path, params);
    }

    public setData<T extends IDataResponse>(path: Path, data: IDataRequest ): Observable<T> {
        return this.con.setData<T>(path, data).pipe(
            tap(() => {
              path.segment && this.updater.updateSegment( path.segment );
            })
          ) as Observable<T>;
    }
}

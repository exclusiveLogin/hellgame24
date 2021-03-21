import { Observable } from 'rxjs';

export interface IService {
    setData(data: any): Observable<any>;
    getData(): Observable<any>;
}

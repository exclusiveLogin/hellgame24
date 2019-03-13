import { Injectable } from '@angular/core';
import { Path } from '../models/path'
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { TopEventsService } from './topevents.service';
import { StateService } from './state.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';


export interface ISegment{
  id: string,
  segment: string,
  updated: string,
  comment: string,
}

@Injectable()
export class UpdaterService {


  private segmentCache:ISegment[] = [];
  private needUpdateSegments: string[] = [];
  private freshState: BehaviorSubject<string[]> = new BehaviorSubject( [] );

  constructor(
    private tes: TopEventsService,
    private state: StateService,
    private http: HttpClient,
    private api: ApiService,
  ) { 
    // период обновления глобального стейта 10 сек по умолчанию 
    let timeout: number = this.state.getState().updateTimeout || 10000;
    setInterval( ()=> this.checkSegments(), timeout);
    this.tes.getSegmentRefreshSignal('login').subscribe(login => !!login && this.checkSegments() );
  }

  private path: Path = {
    segment: 'segment',
    script: 'segment_state.php'
  }

  // public

  public getStateEventor(): Observable<string[]>{
    return this.freshState.asObservable();
  }

  public updateSegment( segment: string ): void{
    
    let body = {
      mode: 'update',
      segment,
    }
    

    this.http.post(`${this.api.getApi()}${this.path.segment}/${this.path.script}`, body).subscribe();

    this.checkSegments();
  }

  private stable = false;

  public checkSegments(): void{
    if( this.tes.getSegmentRefreshSignal('login').value ) this.getAllSegments().subscribe();
  }

  // private

  private getAllSegments(): Observable<ISegment[]>{
    return this.http.get(`${this.api.getApi()}${this.path.segment}/${this.path.script}`,{
      params: { mode: "get_all_segments" , login: this.tes.getSegmentRefreshSignal('login').value }
    }).pipe(
      tap( (seg:ISegment[]) => {
        this.needUpdateSegments = [];
        seg.forEach( s => {
          let cached = this.segmentCache.find( cs => cs.id === s.id);
          if( cached ) {
            if( cached.updated !== s.updated ) this.needUpdateSegments.push( s.segment );
          }
        });
        this.updateTESSegments();
      }),
      tap( (seg:ISegment[]) => this.segmentCache = seg),
      tap( ( seg ) => {
        !this.stable && this.tes.refreshSegment('stable');
        this.stable = true;
      })
    );
  }

  private updateCache( segments: ISegment[]){
    segments.forEach( (seg: ISegment) => {
      // получаем сегмент из кеша
      let target = this.segmentCache.find( s => s.id === seg.id);

      // если он есть обновляем его если нет создаем 
      if( target ) target = seg;
      else this.segmentCache.push( seg );

    })
  }

  private updateTESSegments(){
    this.needUpdateSegments.forEach( s => this.tes.refreshSegment( s ));
    //console.log('Need refreshed:', this.needUpdateSegments);
    this.needUpdateSegments.length && this.freshState.next( this.needUpdateSegments );
  }
}

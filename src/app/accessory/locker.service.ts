import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LockerService {

  private lockSegment: BehaviorSubject<boolean>[] = [];


constructor() {
    this.lockSegment['demo'] = new BehaviorSubject(false);
  }

  public getLockSegment( segment: string){
    return this.lockSegment && this.lockSegment[ segment ];
  }

  public lockingSegment( segment: string ){
    if(this.lockSegment && this.lockSegment[ segment ]) this.lockSegment[ segment ].next( true );
  }

  public unlockingSegment( segment: string ){
    if(this.lockSegment && this.lockSegment[ segment ]) this.lockSegment[ segment ].next( false );
  }
}

import { Injectable } from '@angular/core';
import { IUser } from '../models/user-interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UiService {

  private currentUserSelect: IUser;
  private currentUserSelectChanged: BehaviorSubject<IUser> = new BehaviorSubject(null);

  constructor() { }

  public setCurrentUserSelect( user: IUser ){
    this.currentUserSelect = user;
    this.currentUserSelectChanged.next( this.currentUserSelect );
  }

  public getCurrentUserSelect(){
    return this.currentUserSelect;
  }

  public getCurrentUserChangeEvent(): BehaviorSubject<IUser>{
    return this.currentUserSelectChanged;
  }
}

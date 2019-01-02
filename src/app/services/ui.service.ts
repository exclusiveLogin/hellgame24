import { Injectable } from '@angular/core';
import { IUser } from '../models/user-interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Route, ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class UiService {

  private currentUserSelect: IUser;
  private currentUserSelectChanged: BehaviorSubject<IUser> = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private actRoutes: ActivatedRoute,
  ) { }

  public setCurrentUserSelect( user: IUser ){
    this.currentUserSelect = user;
    this.router.navigate(['dashboard', user.login]);
    this.currentUserSelectChanged.next( this.currentUserSelect );
  }

  public getCurrentUserSelect(){
    return this.currentUserSelect;
  }

  public getCurrentUserChangeEvent(): BehaviorSubject<IUser>{
    return this.currentUserSelectChanged;
  }
}

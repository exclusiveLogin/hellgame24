import { Injectable } from '@angular/core';
import { IUser } from '../models/user-interface';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class UiService {

  private currentUserSelect: IUser;
  private currentUserSelectChanged: BehaviorSubject<IUser> = new BehaviorSubject(null);

  private usermail_shownChanged: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private userstatus_shownChanged: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private useremo_shownChanged: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private router: Router,
  ) { }

  public setCurrentUserSelect( user: IUser ){
    this.currentUserSelect = user;
    this.router.navigate([this.router.url.split('/')[1], user.login]);
    this.currentUserSelectChanged.next( this.currentUserSelect );
  }

  public getCurrentUserSelect(){
    return this.currentUserSelect;
  }

  public getCurrentUserChangeEvent(): Observable<IUser>{
    return this.currentUserSelectChanged.asObservable();
  }

  public getUsermailShownChangeEvent(): Observable<boolean>{
    return this.usermail_shownChanged.asObservable();
  }

  public getUserStatusShownChangeEvent(): Observable<boolean>{
    return this.userstatus_shownChanged.asObservable();
  }

  public getUserEmoShownChangeEvent(): Observable<boolean>{
    return this.useremo_shownChanged.asObservable();
  }


  // user mail
  public openUsermail(): void{
    this.usermail_shownChanged.next( true );
  }

  public closeUsermail(): void{
    this.usermail_shownChanged.next( false );
  }
  // user status
  public openUserStatus(): void{
    this.userstatus_shownChanged.next( true );
  }

  public closeUserStatus(): void{
    this.userstatus_shownChanged.next( false );
  }

  // user emo
  public openEmoStatus(): void{
    this.useremo_shownChanged.next( true );
  }

  public closeEmoStatus(): void{
    this.useremo_shownChanged.next( false );
  }
}

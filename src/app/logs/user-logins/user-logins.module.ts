import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginsComponent } from './user-logins.component';
import { UserLoginsItemComponent } from './user-logins-item/user-logins-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UserLoginsComponent,
    UserLoginsItemComponent
  ],
  exports:[
    UserLoginsComponent,
    UserLoginsItemComponent
  ]
})
export class UserLoginsModule { }

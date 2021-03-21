import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStatusComponent } from './user-status.component';
import { UserStatusItemComponent } from './user-status-item/user-status-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UserStatusComponent,
    UserStatusItemComponent
  ],
  exports: [
    UserStatusComponent,
    UserStatusItemComponent
  ]
})
export class UserStatusModule { }

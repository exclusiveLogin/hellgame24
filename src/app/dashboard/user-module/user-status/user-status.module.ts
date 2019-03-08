import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStatusComponent } from './user-status.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserStatusComponent],
  exports: [UserStatusComponent]
})
export class UserStatusModule { }

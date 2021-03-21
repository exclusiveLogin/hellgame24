import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNotyfierComponent } from './user-notyfier.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserNotyfierComponent],
  exports: [UserNotyfierComponent]
})
export class UserNotifierModule { }

import { NgModule, ViewRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoCardComponent } from './user-info-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserInfoCardComponent],
  exports: [UserInfoCardComponent],
})
export class UserInfoCardModule { }

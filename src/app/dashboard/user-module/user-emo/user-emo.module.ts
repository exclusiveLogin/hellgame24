import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEmoComponent } from './user-emo.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [UserEmoComponent],
  exports: [UserEmoComponent]
})
export class UserEmoModule { }

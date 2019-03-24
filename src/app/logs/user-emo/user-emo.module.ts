import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEmoComponent } from './user-emo.component';
import { UserEmoItemComponent } from './user-emo-item/user-emo-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UserEmoComponent,
    UserEmoItemComponent
  ],
  exports:[
    UserEmoComponent,
    UserEmoItemComponent
  ]
})
export class UserEmoModule { }

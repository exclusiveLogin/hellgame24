import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMessageComponent } from './user-message.component';
import { UserMessageItemComponent } from './user-message-item/user-message-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UserMessageComponent,
    UserMessageItemComponent
  ],
  exports:[
    UserMessageComponent,
    UserMessageItemComponent
  ]
})
export class UserMessageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMailComponent } from './user-mail.component';
import { UserMailGroupComponent } from './user-mail-group/user-mail-group.component';
import { UserMailItemComponent } from './user-mail-group/user-mail-item/user-mail-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UserMailComponent,
    UserMailGroupComponent,
    UserMailItemComponent
  ],
  exports:[
    UserMailComponent,
    UserMailGroupComponent,
    UserMailItemComponent
  ]
})
export class UserMailModule { }

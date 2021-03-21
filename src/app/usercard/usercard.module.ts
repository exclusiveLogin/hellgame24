import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsercardComponent } from './usercard.component';
import { UsercardledComponent } from './usercardled/usercardled.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UsercardComponent,
    UsercardledComponent
  ],
  exports: [
    UsercardComponent,
    UsercardledComponent
  ]
})
export class UserCardModule { }

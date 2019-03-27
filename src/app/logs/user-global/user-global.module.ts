import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGlobalComponent } from './user-global.component';
import { UserGlobalItemComponent } from './user-global-item/user-global-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UserGlobalComponent,
    UserGlobalItemComponent
  ],
  exports:[
    UserGlobalComponent,
    UserGlobalItemComponent
  ]
})
export class UserGlobalModule { }

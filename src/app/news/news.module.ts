import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { Routes, RouterModule } from '@angular/router';

let route: Routes = [
  { path: "", component: NewsComponent }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  declarations: [NewsComponent]
})
export class NewsModule { }

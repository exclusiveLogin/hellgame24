import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng5SliderModule } from 'ng5-slider';
import { SliderComponent } from 'ng5-slider/slider.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    Ng5SliderModule,
    FormsModule
  ],
  exports:[
    Ng5SliderModule,
    FormsModule
  ]
})
export class SharedModule { }

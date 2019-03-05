import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng5SliderModule } from 'ng5-slider';
import { SliderComponent } from 'ng5-slider/slider.component';

@NgModule({
  imports: [
    CommonModule,
    Ng5SliderModule,
  ],
  exports:[
    Ng5SliderModule,
  ]
})
export class SharedModule { }

import {ElementRef, Injectable} from '@angular/core';
import {ChartObject} from 'highcharts';

@Injectable()
export class ChartReflowerService {

  constructor() { }
  public reflow(chart: ChartObject, element: ElementRef) {
    setTimeout(() => {
      element.nativeElement.style.flexGrow = '0';
      element.nativeElement.style.width = '10px';
    }, 1);
    setTimeout(() => {
      chart.reflow();
    }, 2);
    setTimeout(() => {
      element.nativeElement.style.flexGrow = '';
      element.nativeElement.style.width = '';
    }, 3);
    setTimeout(() => {
      chart.reflow();
    }, 4);
  }
}

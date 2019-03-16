import { trigger, transition, style, animate, stagger } from "@angular/animations";

const itemEnterLeaveAnimation = 
    trigger('ItemEnterLeave', [
      transition(':enter', [
        style({ height: 0, opacity: '0' }),
        animate('0.5s ease-in', style({ height: '*', opacity: '1' }))
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({ opacity:'0', height: '0' }))
      ]),
    ]);



  export { itemEnterLeaveAnimation };
import { trigger, transition, style, animate, stagger } from '@angular/animations';

const enterLeaveAnimationDefault =
    trigger('Anima', [
      transition(':enter', [
        style({ height: 0, transform: 'translateY(-100px)' }),
        animate('0.3s ease-in', style({ height: '*', transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateY(-100px)', opacity: '0', height: 0 }))
      ]),
    ]);



  export { enterLeaveAnimationDefault };

import { trigger, transition, style, animate, state } from '@angular/animations';

const loadedAnimation =
    trigger('Loading', [
      state('initial', style({ height: '0', opacity: '0'})),
      state('loaded', style({ height: '*', opacity: '1'})),
      transition('initial => loaded', animate('0.5s ease-in')),
    ]);



  export { loadedAnimation };

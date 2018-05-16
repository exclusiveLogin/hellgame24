import {SafeStyle} from '@angular/platform-browser';

export interface IUser {
  name?: string;
  title?: string;
  status?: string;
  message?: {
    text?: string;
    icon?: string;
    datetime?: string;
  };
  avatar_min?: SafeStyle;
  avatar_big?: SafeStyle;
}

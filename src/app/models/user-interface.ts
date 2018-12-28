import {SafeStyle} from '@angular/platform-browser';

export interface IUser {
  login: string;
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

import {SafeStyle} from '@angular/platform-browser';
import { IUserStatus } from '../dashboard/user-status/user-status.component';

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
  last_change_datetime?: string,
  last_change_status_datetime?: string,
  state_text?: string,
  state_icon?: SafeStyle,
  emotion_current?: string,
  emotion_last?: string,
  emotion_current_datetime?: string,
  emotion_last_datetime?: string,
  emo_trend?: ITrendItem[],
  game_status?: IUserStatus;
}

export interface ITrendItem{
  id: string,
  value: string,
  datetime: string,
  emo_title: string,
  emo_desc: string,
  utc: string,
}

export interface IUserEmo {
  id?: string,
  login?: string,
  value: number,
  title?: string,
  datetime?: string
}
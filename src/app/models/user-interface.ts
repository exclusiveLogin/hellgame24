import {SafeStyle, SafeUrl} from '@angular/platform-browser';
import { IUserStatus } from '../dashboard/user-module/user-status/user-status.component';
import { Observable } from 'rxjs';

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
  silent?: boolean;
  admin?: boolean;
  avatar_min?: SafeStyle;
  avatar_big?: SafeStyle;
  avatar_min_url?: SafeUrl;
  last_change_datetime?: string;
  last_change_datetime_humanity?: string;
  last_change_status_datetime?: string;
  state_text?: string;
  state_icon?: SafeStyle;
  emotion_current?: string;
  emotion_last?: string;
  emotion_current_datetime?: string;
  emotion_last_datetime?: string;
  emo_trend?: ITrendItem[];
  emo_trend$?: Observable<ITrendItem[]>;
  firstInit?: boolean;
  game_status?: IUserStatus;
  last_emo_status?: string;
  online?: boolean;
  address?: string;
  last_login?: ILoginLog;
}

export interface ILoginLog {
  id: string;
  login: string;
  user_agent?: string;
  battery?: string;
  position_lat?: string;
  position_lon?: string;
  accuracy?: string;
  network_equal?: string;
  dlink?: string;
  datetime_create?: string;
}

export interface ITrendItem {
  id: string;
  value: string;
  datetime: string;
  title: string;
  utc: string;
}

export interface IUserEmo {
  id?: string;
  login?: string;
  value: number;
  title?: string;
  datetime?: string;
  mode?: string;
}

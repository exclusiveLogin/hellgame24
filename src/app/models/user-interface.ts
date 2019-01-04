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
  last_change_datetime?: string,
  last_change_status_datetime?: string,
  state_text?: string,
  state_icon?: SafeStyle,
  emotion_current?: string,
  emotion_last?: string,
  emotion_current_datetime?: string,
  emotion_last_datetime?: string,
  emo_trend?: ITrendItem[]
}

export interface ITrendItem{
  id: string,
  value: string,
  datetime: string,
  emo_title: string,
  emo_desc: string,
  utc: string,
}

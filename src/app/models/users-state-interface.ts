import { ITrendItem } from './user-interface';
export interface IUserState {
  id_user: string;
  name: string;
  email: string;
  title: string;
  login: string;
  o_code: string;
  r_code: string;
  played: string;
  online: string;
  emotion: string;
  old_emotion: string;
  status_code: string;
  status_msg: string;
  danger: string;
  upd: string;
  upd_status: string;
  code_msg: string;
  img_big: string;
  img_min: string;
  emo_trend: ITrendItem[];
  emo_last_datetime: string;
  emo_current_datetime: string;
}

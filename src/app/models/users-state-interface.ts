import { ITrendItem } from './user-interface';
import { IUserStatus } from '../dashboard/user-status/user-status.component';
export interface IUserState {
  id_user: string;
  name: string;
  email: string;
  title: string;
  login: string;
  played: string;
  online: string;
  upd: string;
  img_big: string;
  img_min: string;
  emo_trend: ITrendItem[];
  emo_last_datetime: string;
  emo_current_datetime: string;
  status: IUserStatus[];
}

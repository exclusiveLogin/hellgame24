export interface MenuStateInterface {
  dashboard_upd: boolean;
  map_upd: boolean;
  news_upd: boolean;
  meteo_upd: boolean;
  settings_upd: boolean;
}
export interface IMenustate{
  [key: string]: boolean;
}

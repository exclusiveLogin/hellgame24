export interface IUnit {
    id: number;
    level?: number;
    status?: string;
    name?: string;
    description?: string;
    unitClass?: string;
    active?: boolean;
    requires: Partial<IUnitRequires>;
    lat: number;
    lon: number;
}

export interface IUnitResponse {
    id: string;
    level?: string;
    status?: string;
    name?: string;
    description?: string;
    class?: string;
    active?: string;
    rain: string;
    snow: string;
    overcast: string;
    clearsky: string;
    night: string;
    bluehour: string;
    goldhour: string;
    day: string;
    temperature_min: string;
    temperature_max: string;
    wind_min: string;
    wind_max: string;
    lat: string;
    lng: string;
}

export interface IUnitRequires {
    rain: boolean;
    snow: boolean;
    overcast: boolean;
    clearsky: boolean;
    night: boolean;
    bluehour: boolean;
    goldhour: boolean;
    day: boolean;
    temperatureMin: number;
    temperatureMax: number;
    windMin: number;
    windMax: number;
}

export class Unit implements IUnit {
    id = -1;
    level = 1;
    status = 'spawned';
    name = 'unknown';
    description: string;
    unitClass: string;
    active = false;
    requires: Partial<IUnitRequires> = {};
    lat = 0;
    lon = 0;
    constructor(json: IUnitResponse) {
        this.id = +json.id;
        this.level = +json.level;
        this.status = json.status;
        this.name = json.name;
        this.description = json.description;
        this.unitClass = json.class;
        this.active = !!json.active;
        this.requires.bluehour = !!json.bluehour;
        this.requires.goldhour = !!json.goldhour;
        this.requires.rain = !!json.rain;
        this.requires.snow = !!json.snow;
        this.requires.overcast = !!json.overcast;
        this.requires.day = !!json.day;
        this.requires.clearsky = !!json.clearsky;
        this.requires.temperatureMin = +json.temperature_min;
        this.requires.temperatureMax = +json.temperature_max;
        this.requires.windMin = +json.wind_min;
        this.requires.windMax = +json.wind_max;
        this.lat = +json.lat;
        this.lon = +json.lng;
    }
}

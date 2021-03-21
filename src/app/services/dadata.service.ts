import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const authHeaders: HttpHeaders = new HttpHeaders({Authorization: 'Token a778bc907289afb630ad4e6a14d99e6f58ba8e47'});
// authHeaders.append('Authorization', 'Token efb8f551b4e183a7d73c02c07b48cab65b6b5e71');

interface IDadataSuggestion {
  value: string;
  unrestricted_value: string;
  data: IDadataSuggestionData;
}

interface IDadataSuggestionData {
  postal_code: string;
  country: string;
  region_fias_id: string;
  region_kladr_id: string;
  region_with_type: string;
  region_type: string;
  region_type_full: string;
  region: string;
  area_fias_id: string;
  area_kladr_id: string;
  area_with_type: string;
  area_type: string;
  area_type_full: string;
  area: string;
  city_fias_id: string;
  city_kladr_id: string;
  city_with_type: string;
  city_type: string;
  city_type_full: string;
  city: string;
  city_area: string;
  city_district_fias_id: string;
  city_district_kladr_id: string;
  city_district_with_type: string;
  city_district_type: string;
  city_district_type_full: string;
  city_district: string;
  settlement_fias_id: string;
  settlement_kladr_id: string;
  settlement_with_type: string;
  settlement_type: string;
  settlement_type_full: string;
  settlement: string;
  street_fias_id: string;
  street_kladr_id: string;
  street_with_type: string;
  street_type: string;
  street_type_full: string;
  street: string;
  house_fias_id: string;
  house_kladr_id: string;
  house_type: string;
  house_type_full: string;
  house: string;
  block_type: string;
  block_type_full: string;
  block: string;
  flat_type: string;
  flat_type_full: string;
  flat: string;
  flat_area: string;
  square_meter_price: string;
  flat_price: string;
  postal_box: string;
  fias_id: string;
  fias_code: string;
  fias_level: string;
  fias_actuality_state: string;
  kladr_id: string;
  geoname_id: string;
  capital_marker: string;
  okato: string;
  oktmo: string;
  tax_office: string;
  tax_office_legal: string;
  timezone: string;
  geo_lat: string;
  geo_lon: string;
  beltway_hit: string;
  beltway_distance: string;
  metro: string;
  qc_geo: string;
  qc_complete: string;
  qc_house: string;
  history_values: string;
  unparsed_parts: string;
  source: string;
  qc: string;
}

export interface IDadataResponse {
  suggestions: IDadataSuggestion[];
}

@Injectable({
  providedIn: 'root'
})
export class DadataService {

constructor(
  private http: HttpClient
) {
  console.log('DADATA SERVICE ', this);
}

  public getAddressesFromLocation( lat: string, lon: string, accuracy?: string): Observable<string> {
    const api = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address';

    return this.http.get<IDadataResponse>(api, { headers: authHeaders, params: { lat, lon, radius_meters: accuracy }})
      .pipe(
        filter( addreses => !!addreses && !!addreses.suggestions && !!addreses.suggestions.length),
        map( addreses => {
          const value = addreses.suggestions[0] && addreses.suggestions[0].value;
          const city = addreses.suggestions[0].data.region_with_type + ', ' + addreses.suggestions[0].data.city_with_type;

          return ( accuracy && Number(accuracy) < 1000) ? value : city;
        }));
  }
}

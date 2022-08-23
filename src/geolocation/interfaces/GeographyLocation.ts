import { GEOLOCATION_TYPE } from '../geoloaction.constants';

export interface GeographyLocation {
  type: GEOLOCATION_TYPE;
  coordinates:
    | [string | number, string | number]
    | [string | number, string | number][]
    | [string | number, string | number][][];
}

import { City } from './City';
import { FieldOfInterest } from './FIeldOfInterest';
import { Major } from './Major';

export interface User {
  username: string;
  city: City;
  fieldsOfInterest: FieldOfInterest;
  favouriteMajor: Major;
}

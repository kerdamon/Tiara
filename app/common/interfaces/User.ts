import { City } from "./City";
import { FieldOfInterest } from "./FIeldOfInterest";
import { IMajor } from "./IMajor";

export interface User {
  username: string;
  city: City;
  fieldsOfInterest: FieldOfInterest;
  favouriteMajor: IMajor;
}

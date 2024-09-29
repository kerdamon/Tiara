import { FieldOfInterest } from "./FIeldOfInterest";
import { IMajor } from "./IMajor";

export interface User {
  username: string;
  city: string;
  fieldsOfInterest: FieldOfInterest;
  favouriteMajor: IMajor;
}

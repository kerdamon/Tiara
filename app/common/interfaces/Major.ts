import { City } from './City';
import { Faculty } from './Faculty';
import { University } from './University';

export interface Major {
  name: string;
  university: University;
  faculty?: Faculty;
  city: City;
  numberOfGraduates: number;
  jobSearchTime: number; // time spent looking for a full-time job in months
  rank: number; // position in perspektywy.pl ranking
  unemploymentPercent: number; // % unemployment in first year after graduation
  imageUrl: string;
}

export interface IMajor {
  name: string;
  university: string;
  faculty?: string;
  studyField: string;
  studyLevel: string;
  voivodeship: string;
  studyForm: string;
  studyProfile: string;
  semesters: string;
  city: string;
  numberOfGraduates: number;
  jobSearchTime: number; // time spent looking for a full-time job in months
  rank: number; // position in perspektywy.pl ranking
  unemploymentPercent: number; // % unemployment in first year after graduation
  imageUrl: string;
  employmentSalary: number;
}

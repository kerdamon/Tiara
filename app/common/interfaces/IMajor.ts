export interface IMajor {
  name: string;
  description: string;
  university: string;
  faculty?: string;
  studyField: string;
  studyLevel: string;
  voivodeship: string;
  studyForm: string;
  studyProfile: string;
  semesters: string;
  numberOfGraduates: number;
  jobSearchTime: number; // time spent looking for a full-time job in months
  rank: number;
  imageUrl: string;
  employmentSalary: number;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedIn?: string;
  website?: string;
  summary: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'מתחיל' | 'בינוני' | 'מתקדם' | 'מומחה';
}

export interface Language {
  id: string;
  name: string;
  level: 'בסיסי' | 'בינוני' | 'מתקדם' | 'שפת אם' | 'דו לשוני';
}

export interface MilitaryService {
  id: string;
  unit: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  rank?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface DrivingLicense {
  id: string;
  category: string;
  issueYear: string;
}

export interface NationalService {
  id: string;
  organization: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  location?: string;
}

export interface CVData {
  id?: string;
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  militaryService: MilitaryService[];
  nationalService: NationalService[];
  drivingLicenses: DrivingLicense[];
  customSections: CustomSection[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CVDatabase {
  [cvId: string]: CVData;
}

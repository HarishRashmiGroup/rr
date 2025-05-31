
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedTime: string;
  logo: string;
  description: string;
  requirements: string[];
  applicants: number;
  isRemote: boolean;
  companySize: string;
  registrationStartDate?: string;
  closeDate?: string;
  examDate?: string;
  posts?: number;
  detailsUrl?: string;
  officialSiteUrl?: string;
  registrationEndDate: string;
}
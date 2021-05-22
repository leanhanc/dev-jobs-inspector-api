import { ObjectId } from "mongodb";

export interface Job {
  _id?: ObjectId;
  date: string;
  description: string;
  location: string;
  publisher: string;
  site: "Computrabajo" | "Zonajobs" | "Bumeran";
  title: string;
  url: string;
}

export interface PaginatedJobsArgs {
  limit: number;
  page: number;
  search?: string;
}

export interface PaginatedJobsData {
  total: number;
  result: Job[];
}

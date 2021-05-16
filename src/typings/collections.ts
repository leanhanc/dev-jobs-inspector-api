import { Collection } from "mongodb";
import { Job } from "./jobs";

export interface Database {
  jobs: Collection<Job>;
}

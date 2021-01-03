import { IResolvers } from "apollo-server";
import { Database, Job } from "~/typings/collections";

export const jobsResolvers: IResolvers = {
  Query: {
    jobs: async (
      _root: undefined,
      _args: Record<string, unknown>,
      { db }: { db: Database },
    ): Promise<Job[]> => {
      return await db.jobs.find().toArray();
    },
  },
};

import { IResolvers } from "apollo-server-express";
import { Database } from "~/typings/collections";
import { Job, PaginatedJobsArgs, PaginatedJobsData } from "~/typings/jobs";

export const jobsResolvers: IResolvers = {
  Query: {
    jobs: async (
      _root: undefined,
      _args: Record<string, unknown>,
      { db }: { db: Database },
    ): Promise<Job[]> => {
      return await db.jobs.find().toArray();
    },
    paginatedJobs: async (
      _root: undefined,
      { limit, page, search }: PaginatedJobsArgs,
      { db }: { db: Database },
    ): Promise<PaginatedJobsData | null> => {
      const data: PaginatedJobsData = {
        total: 0,
        result: [],
      };

      let whereCondition = {};

      if (search) {
        whereCondition = {
          ...whereCondition,
          $text: {
            $search: search,
          },
        };
      }

      const cursor = await db.jobs.find(whereCondition);

      cursor.skip(page > 0 ? (page - 1) * limit : 0);
      cursor.limit(limit);

      data.total = await cursor.count();
      data.result = await cursor.toArray();

      return data;
    },
  },
};

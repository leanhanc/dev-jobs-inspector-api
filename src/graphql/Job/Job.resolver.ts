import { Resolver, Ctx, Query, Args } from "type-graphql";

import { Database } from "~/typings/collections";

import { Job, PaginatedJobsArgs, PaginatedJobsData } from "./Job.model";

@Resolver(Job)
export class JobResolver {
  constructor() {}

  @Query(() => [Job])
  jobs(@Ctx("db") db: Database): Promise<Job[]> {
    return db.jobs.find().toArray();
  }

  @Query(() => PaginatedJobsData)
  async paginatedJobs(
    @Args() { search, limit, page }: PaginatedJobsArgs,
    @Ctx("db") db: Database,
  ): Promise<PaginatedJobsData | null> {
    const data: PaginatedJobsData = {
      total: 0,
      result: [],
    };

    // TODO: SORT BY DATE
    let cursor = await db.jobs.aggregate([
      {
        $search: {
          index: "search_jobs",
          text: {
            query: search,
            path: {
              wildcard: "*",
            },
          },
        },
      },
      {
        $sort: {
          date: -1,
        },
      },
    ]);

    cursor.skip(page > 0 ? (page - 1) * limit : 0);
    cursor.limit(limit);

    const resultArray = await cursor.toArray();

    data.result = resultArray;
    data.total = resultArray.length;

    return data;
  }
}

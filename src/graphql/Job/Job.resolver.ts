import { AggregationCursor } from "mongodb";
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
    @Args() { search, location, limit, page }: PaginatedJobsArgs,
    @Ctx("db") db: Database,
  ): Promise<PaginatedJobsData | null> {
    const data: PaginatedJobsData = {
      total: 0,
      result: [],
    };

    let cursor: AggregationCursor<Job>;
    let baseQuery = [
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
    ];

    if (!location) {
      cursor = await db.jobs.aggregate(baseQuery);
    } else {
      cursor = await db.jobs.aggregate([
        ...baseQuery,
        { $match: { location: { $regex: location } } },
      ]);
    }

    data.total = await (await cursor.toArray()).length;
    cursor.skip(page > 0 ? (page - 1) * limit : 0);
    cursor.limit(limit);

    const resultArray = await cursor.toArray();

    data.result = resultArray;

    return data;
  }
}

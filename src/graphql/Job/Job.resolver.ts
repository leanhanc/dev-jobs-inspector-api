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
  }
}

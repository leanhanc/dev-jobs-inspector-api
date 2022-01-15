import { ObjectId } from "mongodb";
import { ObjectType, Field, ID, ArgsType, Int } from "type-graphql";

@ObjectType()
export class Job {
  @Field(() => ID)
  _id: ObjectId | undefined;

  @Field()
  date: string;

  @Field()
  description: string;

  @Field()
  location: string;

  @Field()
  publisher: string;

  @Field()
  site: string;

  @Field()
  title: string;

  @Field()
  url: string;
}

@ArgsType()
export class PaginatedJobsArgs {
  @Field(() => Int)
  limit: number = 20;

  @Field(() => Int)
  page: number = 1;

  @Field()
  search?: string;
}

@ObjectType()
export class PaginatedJobsData {
  @Field(() => Int)
  total: number;

  @Field(() => [Job])
  result: Job[];
}

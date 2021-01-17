export * from "./typeDefs";
import { jobsResolvers } from "./resolvers/Jobs.resolver";

export const resolvers = {
  ...jobsResolvers,
};

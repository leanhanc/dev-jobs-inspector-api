import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Job {
    _id: String!
    date: String!
    description: String!
    location: String!
    publisher: String!
    site: String!
    title: String!
    url: String!
  }

  type PaginatedJobsData {
    total: Int!
    result: [Job!]!
  }

  type Query {
    jobs: [Job!]!
    paginatedJobs(limit: Int!, page: Int!, search: String): PaginatedJobsData!
  }
`;

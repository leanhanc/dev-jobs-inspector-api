import { gql } from "apollo-server";

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

  type Query {
    jobs: [Job!]!
  }
`;

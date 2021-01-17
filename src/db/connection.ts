import { MongoClient } from "mongodb";
import { Database, Job } from "~/typings/collections";

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const mongoClient = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoClient.db("dev-jobs");

  return {
    jobs: db.collection<Job>("jobs"),
  };
};

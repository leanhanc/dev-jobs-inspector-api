import express from "express";
import { ApolloServer } from "apollo-server-express";

// Database
import { connectDatabase as dbConnection } from "~/db/connection";

// Services
import { Logger } from "~/services/Logger";

// GraphQL
import { typeDefs, resolvers } from "./graphql";

// Config
import config from "~/config";

// import { getAuthUser, customAuthChecker } from '~/middlewares';

const corsOptions = {
  origin: "http://localhost:3000",
};

export class Server {
  public constructor(private port: number) {}

  async run() {
    // Handle uncaught exceptions/unhandled promise rejections and log them
    process.on("uncaughtException", (e) => {
      Logger.error(`${e.message}\n${e.stack}`);
    });
    process.on("unhandledRejection", (error) => {
      throw error;
    });

    // Init DB connection
    const db = await dbConnection();

    try {
      // Init Express
      const app = express();

      // Init Apollo Server
      const server = new ApolloServer({
        typeDefs,
        resolvers,
        playground: true,
        introspection: true,
        debug: config.generic.isDev,
        tracing: config.generic.isDev,
        context: ({ req, res }) => ({
          db,
          req,
          res,
        }),
      });

      server.applyMiddleware({
        app,
        path: "/api",
        cors: corsOptions,
      });

      // Start App
      app.listen({ port: this.port }, () => Logger.info(`🚀 Server ready at port ${this.port}`));
    } catch (e) {
      Logger.info(e.stack);
    }
  }
}

import express from "express";
import path from "path";
import "reflect-metadata";

// Apollo
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";

// Database
import { connectDatabase as dbConnection } from "~/db/connection";

// Services
import { Logger } from "~/services/Logger";

// Config
import config from "~/config";

const corsOptions = {
  origin: ["http://localhost:3000", process.env.CLIENT_URL || ""],
  credentials: true,
  optionsSuccessStatus: 200,
};

export class Server {
  public constructor(private port: number) {}

  private async getSchema() {
    const schema = await buildSchema({
      resolvers: [
        path.join(__dirname, "graphql/**/*.{query,mutation,resolver,subscription}.{js,ts}"),
      ],
    });
    return schema;
  }

  async run() {
    let schema;
    try {
      schema = await this.getSchema();
    } catch (e) {
      console.log(e);
    }

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
        schema,
        playground: config.generic.isDev,
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
    } catch (e: any) {
      Logger.info(e.stack);
    }
  }
}

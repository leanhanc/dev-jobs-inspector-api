// Environment configuration
import * as dotenv from "dotenv";

// Inject env variables
dotenv.config();

// Server
import { Server } from "~/server";

const PORT = parseInt(process.env.PORT || "", 10) || 7300;

new Server(PORT).run();

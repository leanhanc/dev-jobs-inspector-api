import pino, { Logger as Pino, LoggerOptions } from "pino";

const loggerOptions: LoggerOptions = {
  prettyPrint: true,
  base: null,
};

export const Logger: Pino = pino(loggerOptions);

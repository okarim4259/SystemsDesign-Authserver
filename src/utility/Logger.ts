import * as log4js from "log4js";

const loggerOptions = {
  appenders: {
    access: {
      type: "dateFile",
      filename: "./logs/app.log",
      pattern: "-yyyy-MM-dd",
      category: "http"
    },
    app: {
      type: "file",
      filename: "./logs/app.log",
      maxLogSize: 10485760,
      numBackups: 3
    }
  },
  categories: {
    default: { appenders: ["app"], level: "DEBUG" },
    http: { appenders: ["access"], level: "DEBUG" }
  }
};

export const initLogger = () => {
  log4js.configure(loggerOptions);
};

export const logger = log4js.getLogger("auth-server");

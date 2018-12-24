"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const loggerOptions = {
    appenders: {
        access: {
            type: "dateFile",
            filename: "./Logs/app.log",
            pattern: "-yyyy-MM-dd",
            category: "http"
        },
        app: {
            type: "file",
            filename: "./Logs/app.log",
            maxLogSize: 10485760,
            numBackups: 3
        }
    },
    categories: {
        default: { appenders: ["app"], level: "DEBUG" },
        http: { appenders: ["access"], level: "DEBUG" }
    }
};
exports.initLogger = () => {
    log4js.configure(loggerOptions);
};
exports.logger = log4js.getLogger("auth-server");
//# sourceMappingURL=Logger.js.map
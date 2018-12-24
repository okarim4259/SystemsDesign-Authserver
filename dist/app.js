"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const log4js = require("log4js");
const Logger_1 = require("./utility/Logger");
const passport = require("passport");
class App {
    constructor() {
        this.App = express();
        this.appConfig();
    }
    appConfig() {
        Logger_1.initLogger();
        this.App.use(log4js.connectLogger(log4js.getLogger("http"), { level: "auto" }));
        this.App.use(bodyParser.json());
        this.App.use(bodyParser.urlencoded({ extended: false }));
        this.App.use(cors());
        this.App.use(passport.initialize());
    }
    getExpressApp() {
        return this.App;
    }
}
exports.app = new App().getExpressApp();
//# sourceMappingURL=app.js.map
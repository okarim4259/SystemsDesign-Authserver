import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as log4js from "log4js";

import { initLogger, logger } from "./utility/Logger";
import * as passport from "passport";

class App {
  private App: express.Application;

  constructor() {
    this.App = express();
    this.appConfig();
  }

  private appConfig(): void {
    initLogger();
    this.App.use(
      log4js.connectLogger(log4js.getLogger("http"), { level: "auto" })
    );
    this.App.use(bodyParser.json());
    this.App.use(bodyParser.urlencoded({ extended: false }));
    this.App.use(cors());
    this.App.use(passport.initialize());
  }

  public getExpressApp(): express.Application {
    return this.App;
  }
}

export const app = new App().getExpressApp();

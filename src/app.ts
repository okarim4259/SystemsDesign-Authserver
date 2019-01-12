import * as express from "express";
import * as bodyParser from "body-parser";
import * as log4js from "log4js";
import * as cors from "cors";
import * as passport from "passport";
import * as helmet from "helmet";
import * as cookieParser from "cookie-parser";
import { initLogger } from "./utility/Logger";
import { CorsOptions } from "./utility/CorsOptions";
import { rateLimiter } from "./utility/RateLimiter";

class App {
  private _app: express.Application;
  constructor() {
    this._app = express();
    this._initApplicationMiddleware();
  }

  public _initExpressApplication(): express.Application {
    return this._app;
  }

  private _initApplicationMiddleware(): void {
    this._initLogger();
    this._app.use(helmet());
    this._app.use(cors(CorsOptions));
    this._app.use(rateLimiter);
    this._app.use(cookieParser());
    this._app.use(bodyParser.json());
    this._app.use(bodyParser.urlencoded({ extended: false }));
    this._app.use(passport.initialize());
    require("./config/passport/passport.config");
  }

  private _initLogger(): void {
    initLogger();
    this._app.use(
      log4js.connectLogger(log4js.getLogger("http"), { level: "auto" })
    );
  }
}

export const app = new App()._initExpressApplication();

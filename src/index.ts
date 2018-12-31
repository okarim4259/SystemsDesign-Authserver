require("dotenv").config();
import "reflect-metadata";
import { Container } from "inversify";
import { bindings } from "./config/ioc_container/inversify.config";
import { InversifyExpressServer } from "inversify-express-utils";
import { app } from "./app";
import { logger } from "./utility/Logger";

(async () => {
  const PORT = process.env.PORT || 5000;
  const DI_CONTAINER = new Container();
  await DI_CONTAINER.loadAsync(bindings);
  const inversifyExpressServer = new InversifyExpressServer(
    DI_CONTAINER,
    null,
    { rootPath: "/api/v1" },
    app
  );
  const server = inversifyExpressServer.build();
  server.listen(PORT, async () => {
    try {
      console.log(
        `Server started on port ${PORT} in with NODE_ENV = ${
          process.env.NODE_ENV
        }`
      );
      logger.info(
        `Server started on port ${PORT} in with NODE_ENV = ${
          process.env.NODE_ENV
        }`
      );
    } catch (err) {
      logger.error(`could not start server ${err}`);
    }
  });
})();

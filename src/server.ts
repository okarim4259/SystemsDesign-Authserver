require("dotenv").config();
import "reflect-metadata";
import { logger } from "./utility/Logger";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { bindings } from "./config/inversify.config";
import { app } from "./app";

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  process.env.NODE_ENV = "dev";
}

(async () => {
  const container = new Container();
  await container.loadAsync(bindings);
  const inversifyExpressServer = new InversifyExpressServer(
    container,
    null,
    { rootPath: "/api/v1" },
    app
  );
  const server = inversifyExpressServer.build();
  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    logger.info(`Server started on port ${PORT}`);
  });
})();

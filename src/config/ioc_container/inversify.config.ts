import { AsyncContainerModule, interfaces } from "inversify";
import { initDatabaseConnection } from "../database";
import { logger } from "../../utility/Logger";
import {
  loadControllers,
  bindDAOs,
  bindRepositories,
  bindServices,
  bindProcessors
} from "./inversify.moduleLoader";

export const bindings = new AsyncContainerModule(
  async (bind: interfaces.Bind) => {
    try {
      await initDatabaseConnection();
      await loadControllers();
      bindRepositories(bind);
      bindDAOs(bind);
      bindServices(bind);
      bindProcessors(bind);
    } catch (err) {
      console.log(err);
      logger.error(`Failed to initialize bindings ${err}`);
    }
  }
);

import "reflect-metadata";
import { createConnection, getConnection, Connection } from "typeorm";
import { DatabaseParams } from "./db_params";
import { logger } from "../../utility/Logger";

export const initDatabaseConnection = async () => {
  const connection = await createConnection(DatabaseParams);
  console.log(`initialized database connection: ${getConnection().name}`);
  logger.info(`initialized database connection: ${getConnection().name}`);
  return connection;
};

export const closeDatabaseConnection = async () => {
  await getConnection().close();
};

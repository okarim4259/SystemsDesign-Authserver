import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";
import { DatabaseParams } from "./DatabaseParams";
import { logger } from "../../utility/Logger";

export const initDatabaseConnection = async () => {
  const connection = await createConnection(DatabaseParams);
  return connection;
};

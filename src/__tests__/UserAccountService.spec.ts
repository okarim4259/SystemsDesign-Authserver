require("dotenv").config();
import "reflect-metadata";
import "mocha";
import { expect } from "chai";
import { inject, AsyncContainerModule, Container } from "inversify";
import { cleanUpMetadata } from "inversify-express-utils";
import { TYPE } from "../config/typeBindings/types";
import { UserAccountService } from "../service/UserAccountService";
import { logger } from "../utility/Logger";
import {
  userAccountServiceContainer,
  userAccountDAOContainer,
  userAccountRepositoryContainer
} from "./test.config";
import {
  initDatabaseConnection,
  closeDatabaseConnection
} from "../config/databaseConfiguration/DatabaseConnection";

describe("User Account Service Test", async () => {
  let container: Container;

  beforeEach(async () => {
    cleanUpMetadata();
    container = new Container();
    container.load(userAccountServiceContainer);
    container.load(userAccountDAOContainer);
    container.load(userAccountRepositoryContainer);
    await initDatabaseConnection();
  });

  it("Should pass simple test", () => {
    const a = "a";
    expect(a).to.equal("a");
  });

  it("Should Load UserAccountService", async () => {
    const uas = container.get<UserAccountService>(TYPE.UserAccountService);
    const users = await uas.getAll();
    expect(users.length).to.equal(1);
  });

  afterEach(() => {
    closeDatabaseConnection();
  });
});

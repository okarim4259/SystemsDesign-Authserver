require("dotenv").config();
import "reflect-metadata";
import "mocha";
import { Container } from "inversify";
import { cleanUpMetadata } from "inversify-express-utils";
import { closeDatabaseConnection } from "../config/database";
import { expect } from "chai";
import { UserAccountService } from "../service/UserAccountService";
import { TYPE_SERVICE } from "../config/ioc_container/inversify.typeBindings";
import { bindings } from "../config/ioc_container/inversify.config";
import { UserAccount } from "../entity/UserAccount";

describe("User Account Service Test", async () => {
  let container: Container;
  beforeEach(async () => {
    cleanUpMetadata();
    container = new Container();
    await container.loadAsync(bindings);
  });

  afterEach(async () => {
    await closeDatabaseConnection();
  });

  it("Should pass simple test", () => {
    const result = "result";
    expect(result).to.equal("result");
  });

  // it("Should return all users", async () => {
  //   const userAccountService = container.get<UserAccountService>(
  //     TYPE_SERVICE.UserAccountService
  //   );
  //   const users = await userAccountService.getAllUsers();
  //   expect(users.length).to.equal(1);
  // });

  it("Should return user by username", async () => {
    const userAccountService = container.get<UserAccountService>(
      TYPE_SERVICE.UserAccountService
    );
    const user_name = "okarimdev";
    const user: UserAccount = await userAccountService.getUserByUserName(
      user_name
    );
    expect(user.userName).to.equal(user_name);
  });
});

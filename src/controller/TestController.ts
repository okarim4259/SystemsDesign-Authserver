import { controller, httpGet, response } from "inversify-express-utils";
import * as express from "express";
import { inject } from "inversify";
import { TYPE_DAO } from "../config/ioc_container/inversify.typeBindings";
import { UserAccountDAO } from "../data_access/dao/UserAccountDAO";

@controller("/test")
export class TestController {
  @inject(TYPE_DAO.UserAccountDAO)
  private readonly _userAccountDAO: UserAccountDAO;

  @httpGet("/")
  public async get(@response() res: express.Response) {
    // const users = await this._userAccountDAO.getAllUsers();
    // console.log(users);
    res.json({ message: "Test Controller Initialized" });
  }
}

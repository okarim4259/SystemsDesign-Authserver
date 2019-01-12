import {
  controller,
  httpGet,
  response,
  httpPost,
  request
} from "inversify-express-utils";
import * as express from "express";
import { inject } from "inversify";
import { TYPE_DAO } from "../config/ioc_container/inversify.typeBindings";
import { UserAccountDAO } from "../data_access/dao/UserAccountDAO";

@controller("/test")
export class TestController {
  @inject(TYPE_DAO.UserAccountDAO)
  private readonly _userAccountDAO: UserAccountDAO;

  @httpGet("/")
  public async get(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    res.json({ message: "This is a test controller get method" });
  }

  @httpPost("/")
  public async post(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    res.json({ message: "This is a test controller post method" });
  }
}

import {
  controller,
  httpGet,
  requestParam,
  request,
  response
} from "inversify-express-utils";
import { UserAccountService } from "../service/UserAccountService";
import { RoleService } from "../service/RoleService";
import { inject } from "inversify";
import { TYPE } from "../config/typeBindings/types";
import * as express from "express";
import { HttpStatus } from "../utility/HTTP";

@controller("/permissions")
export class PermissionController {
  private readonly _userAccountService: UserAccountService;
  private readonly _roleService: RoleService;

  constructor(
    @inject(TYPE.UserAccountService) userAccountService: UserAccountService,
    @inject(TYPE.RoleService) roleService: RoleService
  ) {
    this._userAccountService = userAccountService;
    this._roleService = roleService;
  }

  @httpGet("/check/:roleId")
  public async checkPermissions(
    @requestParam("roleId") roleId,
    @requestParam("dummy") dummy,
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      const rolePermissions = await this._roleService.getPermission(roleId);
      return res.status(HttpStatus.OK).json(rolePermissions);
    } catch (err) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ err: "Oops Something went wrong!!!" });
    }
  }
}

import {
  controller,
  httpGet,
  requestParam,
  request,
  response
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPE_SERVICE } from "../config/ioc_container/inversify.typeBindings";
import { RoleService } from "../service/RoleService";
import * as express from "express";
import { HttpStatus } from "../utility/HttpStatus";

@controller("/permissions")
export class PermissionController {
  @inject(TYPE_SERVICE.RoleService)
  private readonly _roleService: RoleService;

  @httpGet("/check/:roleId")
  public async checkRolePermission(
    @requestParam("roleId") roleId,
    @response() res: express.Response
  ) {
    try {
      const rolePermissions = await this._roleService.getRolePermissions(
        roleId
      );
      return res.status(HttpStatus.OK).json(rolePermissions);
    } catch (err) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Oops something went wrong!!!" });
    }
  }
}

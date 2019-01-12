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
import passport = require("passport");
import { UserAccountService } from "../service/UserAccountService";
import { Role } from "../entity/Role";
import { IPermissionsResponse } from "../domain/user/IPermissionResponse";

@controller("/permissions")
export class PermissionController {
  @inject(TYPE_SERVICE.RoleService)
  private readonly _roleService: RoleService;

  @inject(TYPE_SERVICE.UserAccountService)
  private readonly _userAccountService: UserAccountService;

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

  @httpGet(
    "/get-user-permissions",
    passport.authenticate("context", { session: false })
  )
  public async getUserPermissions(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      const rolePermissions = new Array<IPermissionsResponse>();
      const userRoles: Role[] = await this._userAccountService.getUserRole(
        req.user.id
      );

      for (let i = 0, len = userRoles.length; i < len; i++) {
        const role: Role = userRoles[i];
        const rolePermission: Role = await this._roleService.getRolePermissions(
          role.id
        );
        const permission: IPermissionsResponse = {
          roleId: rolePermission.id,
          roleName: rolePermission.name,
          permissions: rolePermission.permissions
        };
        rolePermissions.push(permission);
      }

      return res.status(HttpStatus.OK).json(rolePermissions);
    } catch (err) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Oops something went wrong!!!" });
    }
  }
}

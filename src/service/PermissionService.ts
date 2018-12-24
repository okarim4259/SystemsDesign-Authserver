import { injectable, inject } from "inversify";
import { PermissionDAO } from "../dataAccess/dao/PermissionDAO";
import { TYPE } from "../config/typeBindings/types";
import { throws } from "assert";
import { Permission } from "../entity/Permission";

@injectable()
export class PermissionService {
  private readonly _permissionDAO: PermissionDAO;

  constructor(@inject(TYPE.PermissionDAO) permissionDAO: PermissionDAO) {
    this._permissionDAO = permissionDAO;
  }

  public async getAllPermissions(): Promise<Permission[]> {
    return this._permissionDAO.getAllPermissions();
  }

  public async getPermissionsByRole() {
    return this._permissionDAO.getPermissionsByRole();
  }
}

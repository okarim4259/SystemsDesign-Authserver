import { injectable, inject } from "inversify";
import { TYPE_DAO } from "../config/ioc_container/inversify.typeBindings";
import { PermissionDAO } from "../data_access/dao/PermissionDAO";
import { Permission } from "../entity/Permission";

@injectable()
export class PermissionService {
  @inject(TYPE_DAO.PermissionDAO)
  private readonly _permissionDAO: PermissionDAO;

  public async getAllPermissions(): Promise<Permission[]> {
    return this._permissionDAO.findAllPermissions();
  }
}

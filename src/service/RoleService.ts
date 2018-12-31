import { injectable, inject } from "inversify";
import { TYPE_DAO } from "../config/ioc_container/inversify.typeBindings";
import { RoleDAO } from "../data_access/dao/RoleDAO";
import { Role } from "../entity/Role";

@injectable()
export class RoleService {
  @inject(TYPE_DAO.RoleDAO)
  private readonly _roleDAO: RoleDAO;

  public async getAllRoles(): Promise<Role[]> {
    return this._roleDAO.findAllRoles();
  }

  public async getRoleByName(_roleName: string): Promise<Role> {
    return this._roleDAO.findRoleByName(_roleName);
  }

  public async getRolePermissions(_roleId) {
    return this._roleDAO.findRolePermissions(_roleId);
  }
}

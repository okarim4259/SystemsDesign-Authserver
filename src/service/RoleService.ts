import { injectable, inject } from "inversify";
import { RoleDAO } from "../dataAccess/dao/RoleDAO";
import { TYPE } from "../config/typeBindings/types";

@injectable()
export class RoleService {
  private readonly _roleDAO: RoleDAO;

  constructor(@inject(TYPE.RoleDAO) roleDAO: RoleDAO) {
    this._roleDAO = roleDAO;
  }

  public async getRoleByName(_roleName) {
    return await this._roleDAO.getRoleByName(_roleName);
  }

  public async getPermission(_roleId) {
    return this._roleDAO.findPerm(_roleId);
  }
}

import { injectable, inject } from "inversify";
import { Repository } from "typeorm";
import { Permission } from "../../entity/Permission";
import { TYPE } from "../../config/typeBindings/types";
import { throws } from "assert";

@injectable()
export class PermissionDAO {
  private readonly _permissionRepository: Repository<Permission>;

  constructor(
    @inject(TYPE.PermissionRepository)
    permissionRepository: Repository<Permission>
  ) {
    this._permissionRepository = permissionRepository;
  }

  public async getAllPermissions(): Promise<Permission[]> {
    return this._permissionRepository.find();
  }

  public async getPermissionsByRole() {
    return this._permissionRepository.find({ relations: ["roles"] });
  }
}

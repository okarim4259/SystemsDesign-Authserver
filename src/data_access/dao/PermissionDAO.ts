import { injectable, inject } from "inversify";
import { TYPE_REPOSITORY } from "../../config/ioc_container/inversify.typeBindings";
import { Repository } from "typeorm";
import { Permission } from "../../entity/Permission";

@injectable()
export class PermissionDAO {
  @inject(TYPE_REPOSITORY.PermissionRepository)
  private readonly _permissionRepository: Repository<Permission>;

  public async findAllPermissions(): Promise<Permission[]> {
    return this._permissionRepository.find();
  }
}

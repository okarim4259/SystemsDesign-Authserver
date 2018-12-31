import { inject, injectable } from "inversify";
import { TYPE_REPOSITORY } from "../../config/ioc_container/inversify.typeBindings";
import { Repository } from "typeorm";
import { Role } from "../../entity/Role";

@injectable()
export class RoleDAO {
  @inject(TYPE_REPOSITORY.RoleRepository)
  private readonly _roleRepository: Repository<Role>;

  public async findAllRoles() {
    return this._roleRepository.find();
  }

  public async findRoleByName(_roleName: string): Promise<Role> {
    return this._roleRepository.findOne({ where: { name: _roleName } });
  }

  public async findRolePermissions(_roleId): Promise<Role> {
    return this._roleRepository.findOne({
      relations: ["permissions"],
      where: { id: _roleId }
    });
  }
}

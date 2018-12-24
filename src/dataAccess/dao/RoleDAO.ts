import { injectable, inject } from "inversify";
import { Repository } from "typeorm";
import { Role } from "../../entity/Role";
import { TYPE } from "../../config/typeBindings/types";
import { IRole } from "../../domain/IRole";
import { throws } from "assert";

@injectable()
export class RoleDAO {
  private readonly _roleRepository: Repository<Role>;

  constructor(@inject(TYPE.RoleRepository) roleRepository: Repository<Role>) {
    this._roleRepository = roleRepository;
  }

  public async createNewRole(_roleName: string) {
    const newRole: IRole = {
      name: _roleName
    };
    const createdRole = this._roleRepository.create(newRole);
    return await this._roleRepository.save(createdRole);
  }

  public async getRoleByName(_roleName: string) {
    return await this._roleRepository.findOne({ where: { name: _roleName } });
  }

  public async findPerm(_roleId) {
    return this._roleRepository.findOne({
      relations: ["permissions"],
      where: { id: _roleId }
    });
  }

  public async getPermissions(_roleId) {
    return this._roleRepository.find({
      relations: ["permissions"],
      where: { id: _roleId }
    });
  }
}

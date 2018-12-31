import { Repository, getManager } from "typeorm";
import { UserAccount } from "../entity/UserAccount";
import { Role } from "../entity/Role";
import { Permission } from "../entity/Permission";

export const UserAccountRepository = (): Repository<UserAccount> => {
  return getManager().getRepository(UserAccount);
};

export const RoleRepository = (): Repository<Role> => {
  return getManager().getRepository(Role);
};

export const PermissionRepository = (): Repository<Permission> => {
  return getManager().getRepository(Permission);
};

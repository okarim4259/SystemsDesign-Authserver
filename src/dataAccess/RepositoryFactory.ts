import { getManager, Repository } from "typeorm";
import { Address } from "../entity/Address";
import { UserAccount } from "../entity/UserAccount";
import { Permission } from "../entity/Permission";
import { Role } from "../entity/Role";

export const UserAccountRepository = (): Repository<UserAccount> => {
  return getManager().getRepository(UserAccount);
};

export const AddressRepository = (): Repository<Address> => {
  return getManager().getRepository(Address);
};

export const PermissionRepository = (): Repository<Permission> => {
  return getManager().getRepository(Permission);
};

export const RoleRepository = (): Repository<Role> => {
  return getManager().getRepository(Role);
};

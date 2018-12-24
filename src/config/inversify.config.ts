import { AsyncContainerModule } from "inversify";
import { Repository, getConnection } from "typeorm";
import { UserAccount } from "../entity/UserAccount";
import { initDatabaseConnection } from "./databaseConfiguration/DatabaseConnection";
import { TYPE } from "./typeBindings/types";
import {
  UserAccountRepository,
  AddressRepository,
  RoleRepository,
  PermissionRepository
} from "../dataAccess/RepositoryFactory";
import { logger } from "../utility/Logger";
import { Address } from "../entity/Address";
import { UserAccountService } from "../service/UserAccountService";
import { UserAccountDAO } from "../dataAccess/DAO/UserAccountDAO";
import { TokenService } from "../service/TokenService";
import { Role } from "../entity/Role";
import { Permission } from "../entity/Permission";
import { RoleService } from "../service/RoleService";
import { RoleDAO } from "../dataAccess/dao/RoleDAO";
import { PermissionDAO } from "../dataAccess/dao/PermissionDAO";
import { PermissionService } from "../service/PermissionService";

export const bindings = new AsyncContainerModule(async bind => {
  try {
    await initDatabaseConnection();
    console.log(
      `initialized database connection: connected to ${getConnection().name}`
    );
    logger.info(
      `initialized database connection: connected to ${getConnection().name}`
    );

    await require("../config/passport.config");
    await require("../controller/UserController");
    await require("../controller/AddressController");
    await require("../controller/AdminController");
    await require("../controller/PermissionController");

    bind<Repository<UserAccount>>(TYPE.UserAccountRepository).toDynamicValue(
      () => {
        return UserAccountRepository();
      }
    );
    bind<Repository<Address>>(TYPE.AddressRepository).toDynamicValue(() => {
      return AddressRepository();
    });
    bind<Repository<Role>>(TYPE.RoleRepository).toDynamicValue(() => {
      return RoleRepository();
    });

    bind<Repository<Permission>>(TYPE.PermissionRepository).toDynamicValue(
      () => {
        return PermissionRepository();
      }
    );

    bind<UserAccountService>(TYPE.UserAccountService).to(UserAccountService);
    bind<UserAccountDAO>(TYPE.UserAccountDAO).to(UserAccountDAO);
    bind<TokenService>(TYPE.TokenService).to(TokenService);
    bind<RoleService>(TYPE.RoleService).to(RoleService);
    bind<RoleDAO>(TYPE.RoleDAO).to(RoleDAO);
    bind<PermissionDAO>(TYPE.PermissionDAO).to(PermissionDAO);
    bind<PermissionService>(TYPE.PermissionService).to(PermissionService);
  } catch (err) {
    logger.error("Failed to initiallize ioc bindings..");
  }
});

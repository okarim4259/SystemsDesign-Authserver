import { interfaces } from "inversify";
import { UserAccountService } from "../../service/UserAccountService";
import {
  TYPE_SERVICE,
  TYPE_DAO,
  TYPE_REPOSITORY,
  TYPE_PROCESSOR
} from "./inversify.typeBindings";
import { UserAccountDAO } from "../../data_access/dao/UserAccountDAO";
import { Repository } from "typeorm";
import { UserAccount } from "../../entity/UserAccount";
import {
  UserAccountRepository,
  RoleRepository,
  PermissionRepository
} from "../../data_access/RepositoryFactory";
import { RoleDAO } from "../../data_access/dao/RoleDAO";
import { Role } from "../../entity/Role";
import { Permission } from "../../entity/Permission";
import { RoleService } from "../../service/RoleService";
import { PermissionDAO } from "../../data_access/dao/PermissionDAO";
import { PermissionService } from "../../service/PermissionService";
import { AuthProcessor } from "../../processor/AuthProcessor";
import { TokenService } from "../../service/TokenService";
import { UserAccountProcessor } from "../../processor/UserAccountProcessor";
import { OAuthProcessor } from "../../processor/OAuthProcessor";

export const loadControllers = async (): Promise<void> => {
  await require("../../controller/TestController");
  await require("../../controller/AuthenticationController");
  await require("../../controller/UserAccountController");
  await require("../../controller/OAuthController");
  await require("../../controller/PermissionController");
};

export const bindRepositories = (bind: interfaces.Bind): void => {
  bind<Repository<UserAccount>>(TYPE_REPOSITORY.UserAccountRepository)
    .toDynamicValue(() => {
      return UserAccountRepository();
    })
    .inRequestScope();
  bind<Repository<Role>>(TYPE_REPOSITORY.RoleRepository)
    .toDynamicValue(() => {
      return RoleRepository();
    })
    .inRequestScope();
  bind<Repository<Permission>>(TYPE_REPOSITORY.PermissionRepository)
    .toDynamicValue(() => {
      return PermissionRepository();
    })
    .inRequestScope();
};

export const bindDAOs = (bind: interfaces.Bind): void => {
  bind<UserAccountDAO>(TYPE_DAO.UserAccountDAO).to(UserAccountDAO);
  bind<RoleDAO>(TYPE_DAO.RoleDAO).to(RoleDAO);
  bind<PermissionDAO>(TYPE_DAO.PermissionDAO).to(PermissionDAO);
};

export const bindServices = (bind: interfaces.Bind): void => {
  bind<UserAccountService>(TYPE_SERVICE.UserAccountService).to(
    UserAccountService
  );
  bind<RoleService>(TYPE_SERVICE.RoleService).to(RoleService);
  bind<PermissionService>(TYPE_SERVICE.PermissionService).to(PermissionService);
  bind<TokenService>(TYPE_SERVICE.TokenService).to(TokenService);
};

export const bindProcessors = (bind: interfaces.Bind): void => {
  bind<AuthProcessor>(TYPE_PROCESSOR.AuthProcessor).to(AuthProcessor);
  bind<UserAccountProcessor>(TYPE_PROCESSOR.UserAccountProcessor).to(
    UserAccountProcessor
  );
  bind<OAuthProcessor>(TYPE_PROCESSOR.OAuthProcessor).to(OAuthProcessor);
};

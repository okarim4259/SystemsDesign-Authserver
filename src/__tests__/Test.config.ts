import { ContainerModule } from "inversify";
import { UserAccountService } from "../service/UserAccountService";
import {
  TYPE_SERVICE,
  TYPE_DAO,
  TYPE_REPOSITORY
} from "../config/ioc_container/inversify.typeBindings";
import { UserAccountDAO } from "../data_access/dao/UserAccountDAO";
import { Repository } from "typeorm";
import { UserAccount } from "../entity/UserAccount";
import { UserAccountRepository } from "../data_access/RepositoryFactory";

export const userAccountRepositoryTestContainer = new ContainerModule(bind => {
  bind<Repository<UserAccount>>(TYPE_REPOSITORY.UserAccountRepository)
    .toDynamicValue(() => {
      return UserAccountRepository();
    })
    .inRequestScope();
});

export const userAccountServiceTestContainer = new ContainerModule(bind => {
  bind<UserAccountService>(TYPE_SERVICE.UserAccountService).to(
    UserAccountService
  );
});

export const userAccountDAOTestContainer = new ContainerModule(bind => {
  bind<UserAccountDAO>(TYPE_DAO.UserAccountDAO).to(UserAccountDAO);
});

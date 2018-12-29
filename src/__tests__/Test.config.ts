import { ContainerModule } from "inversify";
import { UserAccountService } from "../service/UserAccountService";
import { TYPE } from "../config/typeBindings/types";
import { UserAccountDAO } from "../dataAccess/DAO/UserAccountDAO";
import { Repository } from "typeorm";
import { UserAccount } from "../entity/UserAccount";
import { UserAccountRepository } from "../dataAccess/RepositoryFactory";

let userAccountServiceContainer = new ContainerModule(bind => {
  bind<UserAccountService>(TYPE.UserAccountService).to(UserAccountService);
});

let userAccountDAOContainer = new ContainerModule(bind => {
  bind<UserAccountDAO>(TYPE.UserAccountDAO).to(UserAccountDAO);
});

let userAccountRepositoryContainer = new ContainerModule(bind => {
  bind<Repository<UserAccount>>(TYPE.UserAccountRepository).toDynamicValue(
    () => {
      return UserAccountRepository();
    }
  );
});

export {
  userAccountServiceContainer,
  userAccountDAOContainer,
  userAccountRepositoryContainer
};

import { IUserAccountType } from "./IUserAccountType";
import { Role } from "../entity/Role";

export interface IUserAccount {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: IUserAccountType;
  roles: Role[];
  googleAccountId?: string;
}

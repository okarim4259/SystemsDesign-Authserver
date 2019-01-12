import { EUserAccountType } from "../helpers/EUserAccountType";
import { Role } from "../../entity/Role";

export interface INewUserRequest {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: EUserAccountType;
  roles: Role[];
  externalProviderId?: string;
  phoneNumber?: string;
}

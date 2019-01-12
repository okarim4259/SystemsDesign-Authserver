import { EUserAccountType } from "../helpers/EUserAccountType";
import { Role } from "../../entity/Role";

export interface IUpdateUserRequest {
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
}

import { Role } from "../entity/Role";

export interface IUserContext {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  accountType?: string;
  roles?: Role[];
  permissions?: any;
}

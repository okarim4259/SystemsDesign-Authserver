import { Role } from "../entity/Role";

export interface IUserResponse {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  accountType?: string;
  additionalInfo?: any;
}

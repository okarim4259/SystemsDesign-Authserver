import { Permission } from "../../entity/Permission";

export interface IPermissionsResponse {
  roleId: number;
  roleName: string;
  permissions: Permission[];
}

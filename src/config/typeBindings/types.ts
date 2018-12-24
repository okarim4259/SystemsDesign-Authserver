export const TYPE = {
  ////USER
  UserAccountRepository: Symbol("UserAccountRepository"),
  UserAccountService: Symbol("UserAccountService"),
  UserAccountDAO: Symbol("UserAccountDAO"),
  AddressRepository: Symbol("AddressRepository"),

  //ROLE
  RoleDAO: Symbol("RoleDAO"),
  RoleService: Symbol("RoleService"),
  RoleRepository: Symbol("RoleRepository"),

  //TOKEM
  TokenService: Symbol("TokenService"),

  //PERMISSION

  PermissionRepository: Symbol("PermissionRepository"),
  PermissionDAO: Symbol("PermissionDAO"),
  PermissionService: Symbol("PermissionService")
};

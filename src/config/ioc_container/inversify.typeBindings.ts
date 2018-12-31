export const TYPE = {};

export const TYPE_REPOSITORY = {
  UserAccountRepository: Symbol("UserAccountRepository"),
  RoleRepository: Symbol("RoleRepository"),
  PermissionRepository: Symbol("PermissionRepository")
};

export const TYPE_SERVICE = {
  UserAccountService: Symbol("UserAccountService"),
  RoleService: Symbol("RoleService"),
  PermissionService: Symbol("PermissionService"),
  TokenService: Symbol("TokenService")
};

export const TYPE_DAO = {
  UserAccountDAO: Symbol("UserAccountDAO"),
  RoleDAO: Symbol("RoleDAO"),
  PermissionDAO: Symbol("PermissionDAO")
};

export const TYPE_PROCESSOR = {
  AuthProcessor: Symbol("AuthProcessor"),
  UserAccountProcessor: Symbol("UserAccountProcessor"),
  OAuthProcessor: Symbol("OAuthProcessor")
};

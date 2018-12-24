"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Address_1 = require("../entity/Address");
const UserAccount_1 = require("../entity/UserAccount");
const Permission_1 = require("../entity/Permission");
const Role_1 = require("../entity/Role");
exports.UserAccountRepository = () => {
    return typeorm_1.getManager().getRepository(UserAccount_1.UserAccount);
};
exports.AddressRepository = () => {
    return typeorm_1.getManager().getRepository(Address_1.Address);
};
exports.PermissionRepository = () => {
    return typeorm_1.getManager().getRepository(Permission_1.Permission);
};
exports.RoleRepository = () => {
    return typeorm_1.getManager().getRepository(Role_1.Role);
};
//# sourceMappingURL=RepositoryFactory.js.map
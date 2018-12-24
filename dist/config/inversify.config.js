"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const DatabaseConnection_1 = require("./databaseConfiguration/DatabaseConnection");
const types_1 = require("./typeBindings/types");
const RepositoryFactory_1 = require("../dataAccess/RepositoryFactory");
const Logger_1 = require("../utility/Logger");
const UserAccountService_1 = require("../service/UserAccountService");
const UserAccountDAO_1 = require("../dataAccess/DAO/UserAccountDAO");
const TokenService_1 = require("../service/TokenService");
const RoleService_1 = require("../service/RoleService");
const RoleDAO_1 = require("../dataAccess/dao/RoleDAO");
const PermissionDAO_1 = require("../dataAccess/dao/PermissionDAO");
const PermissionService_1 = require("../service/PermissionService");
exports.bindings = new inversify_1.AsyncContainerModule((bind) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield DatabaseConnection_1.initDatabaseConnection();
        console.log(`initialized database connection: connected to ${typeorm_1.getConnection().name}`);
        Logger_1.logger.info(`initialized database connection: connected to ${typeorm_1.getConnection().name}`);
        yield require("../config/passport.config");
        yield require("../controller/UserController");
        yield require("../controller/AddressController");
        yield require("../controller/AdminController");
        yield require("../controller/PermissionController");
        bind(types_1.TYPE.UserAccountRepository).toDynamicValue(() => {
            return RepositoryFactory_1.UserAccountRepository();
        });
        bind(types_1.TYPE.AddressRepository).toDynamicValue(() => {
            return RepositoryFactory_1.AddressRepository();
        });
        bind(types_1.TYPE.RoleRepository).toDynamicValue(() => {
            return RepositoryFactory_1.RoleRepository();
        });
        bind(types_1.TYPE.PermissionRepository).toDynamicValue(() => {
            return RepositoryFactory_1.PermissionRepository();
        });
        bind(types_1.TYPE.UserAccountService).to(UserAccountService_1.UserAccountService);
        bind(types_1.TYPE.UserAccountDAO).to(UserAccountDAO_1.UserAccountDAO);
        bind(types_1.TYPE.TokenService).to(TokenService_1.TokenService);
        bind(types_1.TYPE.RoleService).to(RoleService_1.RoleService);
        bind(types_1.TYPE.RoleDAO).to(RoleDAO_1.RoleDAO);
        bind(types_1.TYPE.PermissionDAO).to(PermissionDAO_1.PermissionDAO);
        bind(types_1.TYPE.PermissionService).to(PermissionService_1.PermissionService);
    }
    catch (err) {
        Logger_1.logger.error("Failed to initiallize ioc bindings..");
    }
}));
//# sourceMappingURL=inversify.config.js.map
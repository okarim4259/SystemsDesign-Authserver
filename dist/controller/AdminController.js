"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bcrypt = require("bcryptjs");
const inversify_express_utils_1 = require("inversify-express-utils");
const UserAccountService_1 = require("../service/UserAccountService");
const inversify_1 = require("inversify");
const types_1 = require("../config/typeBindings/types");
const HTTP_1 = require("../utility/HTTP");
const ERoles_1 = require("../utility/ERoles");
const RoleService_1 = require("../service/RoleService");
const IUserAccountType_1 = require("../domain/IUserAccountType");
const Logger_1 = require("../utility/Logger");
let AdminController = class AdminController {
    constructor(userAccountService, roleService) {
        this._userAccountService = userAccountService;
        this._roleService = roleService;
    }
    get(res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({ msg: "admin controller initialized" });
        });
    }
    registerAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emailExists = yield this._userAccountService.findByEmail(req.body.email);
                const userNameExits = yield this._userAccountService.findByUserName(req.body.userName);
                if (emailExists) {
                    return res
                        .status(HTTP_1.HttpStatus.CONFLICT)
                        .json({ message: "The email you entered is already in use" });
                }
                if (userNameExits) {
                    return res
                        .status(HTTP_1.HttpStatus.CONFLICT)
                        .json({ message: "The username you entered is already in use" });
                }
                const role_user = yield this._roleService.getRoleByName(ERoles_1.ERoles.USER);
                const role_admin = yield this._roleService.getRoleByName(ERoles_1.ERoles.ADMIN);
                const newUser = {
                    userName: req.body.userName,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: yield bcrypt.hash(req.body.password, 10),
                    accountType: IUserAccountType_1.IUserAccountType.local,
                    roles: [role_user, role_admin]
                };
                const registerNewUser = yield this._userAccountService.registerNewUser(newUser);
                if (!registerNewUser) {
                    return res
                        .status(HTTP_1.HttpStatus.INTERNAL_SERVER_ERROR)
                        .json({ message: "Oops something went wrong!!!" });
                }
                const adminUser = {
                    userId: registerNewUser.userId,
                    userName: registerNewUser.userName,
                    firstName: registerNewUser.firstName,
                    lastName: registerNewUser.lastName,
                    email: registerNewUser.email,
                    accountType: registerNewUser.accountType
                };
                Logger_1.logger.info(`Successfully Registered new User ${registerNewUser.userName}`);
                return res.status(HTTP_1.HttpStatus.CREATED).json(adminUser);
            }
            catch (err) {
                return res
                    .status(HTTP_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Oops something went wrong!!!" });
            }
        });
    }
};
__decorate([
    inversify_express_utils_1.httpGet("/test"),
    __param(0, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "get", null);
__decorate([
    inversify_express_utils_1.httpPost("/register"),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "registerAdmin", null);
AdminController = __decorate([
    inversify_express_utils_1.controller("/admin"),
    __param(0, inversify_1.inject(types_1.TYPE.UserAccountService)),
    __param(1, inversify_1.inject(types_1.TYPE.RoleService)),
    __metadata("design:paramtypes", [UserAccountService_1.UserAccountService,
        RoleService_1.RoleService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=AdminController.js.map
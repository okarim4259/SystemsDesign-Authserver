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
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const types_1 = require("../config/typeBindings/types");
const Logger_1 = require("../utility/Logger");
const bcrypt = require("bcryptjs");
const UserAccountService_1 = require("../service/UserAccountService");
const IUserAccountType_1 = require("../domain/IUserAccountType");
const HTTP_1 = require("../utility/HTTP");
const constants_config_1 = require("../config/constants/constants.config");
const passport = require("passport");
const TokenService_1 = require("../service/TokenService");
const RoleService_1 = require("../service/RoleService");
const ERoles_1 = require("../utility/ERoles");
let UserController = class UserController {
    constructor(userAccountService, tokenService, roleService) {
        this.TAG = "USER_CONTROLLER ";
        this._userAccountService = userAccountService;
        this._tokenService = tokenService;
        this._roleService = roleService;
    }
    get(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this._userAccountService.getAll();
                const usersResonses = new Array();
                users.forEach(user => {
                    const userResponse = {
                        userId: user.userId,
                        userName: user.userName,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    };
                    usersResonses.push(userResponse);
                });
                res.json(usersResonses);
            }
            catch (err) {
                Logger_1.logger.error(this.TAG + err.message);
                return res
                    .status(HTTP_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Oops something went wrong!!!" });
            }
        });
    }
    registerAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emailExists = yield this._userAccountService.findByEmail(req.body.email);
                const userNameExits = yield this._userAccountService.findByUserName(req.body.userName);
                if (userNameExits) {
                    return res
                        .status(HTTP_1.HttpStatus.CONFLICT)
                        .json({ message: "The username you entered is already in use" });
                }
                if (emailExists) {
                    return res
                        .status(HTTP_1.HttpStatus.CONFLICT)
                        .json({ message: "The email you entered is already in use" });
                }
                const roles = [
                    yield this._roleService.getRoleByName(ERoles_1.ERoles.USER)
                ];
                const newUser = {
                    userName: req.body.userName,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: yield bcrypt.hash(req.body.password, 10),
                    accountType: IUserAccountType_1.IUserAccountType.local,
                    roles: roles
                };
                const registerNewUser = yield this._userAccountService.registerNewUser(newUser);
                if (!registerNewUser) {
                    return res
                        .status(HTTP_1.HttpStatus.INTERNAL_SERVER_ERROR)
                        .json({ message: "Oops something went wrong!!!" });
                }
                const user = {
                    userId: registerNewUser.userId,
                    userName: registerNewUser.userName,
                    firstName: registerNewUser.firstName,
                    lastName: registerNewUser.lastName,
                    email: registerNewUser.email,
                    accountType: registerNewUser.accountType
                };
                Logger_1.logger.info(`Successfully Registered new User ${registerNewUser.userName}`);
                return res.status(HTTP_1.HttpStatus.CREATED).json(user);
            }
            catch (err) {
                Logger_1.logger.error(this.TAG + err.message);
                return res
                    .status(HTTP_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Oops something went wrong!!!" });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._userAccountService.findByEmail(req.body.email);
                if (!user) {
                    return res
                        .status(HTTP_1.HttpStatus.NOT_FOUND)
                        .json({ message: "Could not find account with that email" });
                }
                const passwordMatched = yield bcrypt.compare(req.body.password, user.password);
                if (!passwordMatched) {
                    return res
                        .status(HTTP_1.HttpStatus.UNAUTHORIZED)
                        .json({ message: "Incorrect Password...." });
                }
                const payload = {
                    ISSUER: constants_config_1.KEYS.ISSUER,
                    sub: user.userId,
                    email: user.email
                };
                const jwtToken = yield this._tokenService.generateUserAccessToken(payload);
                if (!jwtToken) {
                    return res
                        .status(HTTP_1.HttpStatus.INTERNAL_SERVER_ERROR)
                        .json({ message: "Oops something went wrong!!!" });
                }
                return res.status(HTTP_1.HttpStatus.OK).json({
                    success: true,
                    access_token: "Bearer " + jwtToken
                });
            }
            catch (err) {
                Logger_1.logger.error(this.TAG + err.message);
                return res
                    .status(HTTP_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Oops something went wrong!!!" });
            }
        });
    }
    getCurrentUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRoles = yield this._userAccountService.getUserRoles(req.user.id);
                const user = {
                    userId: req.user.userId,
                    userName: req.user.userName,
                    firstName: req.user.firstName,
                    lastName: req.user.lastName,
                    email: req.user.email,
                    accountType: req.user.accountType,
                    roles: userRoles
                };
                return res.status(HTTP_1.HttpStatus.OK).json(user);
            }
            catch (err) {
                Logger_1.logger.error(this.TAG + err.message);
                return res
                    .status(HTTP_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Oops something went wrong!!!" });
            }
        });
    }
};
__decorate([
    inversify_express_utils_1.httpGet("/"),
    __param(0, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get", null);
__decorate([
    inversify_express_utils_1.httpPost("/register"),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerAdmin", null);
__decorate([
    inversify_express_utils_1.httpPost("/login"),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "loginUser", null);
__decorate([
    inversify_express_utils_1.httpGet("/current", passport.authenticate("local", { session: false })),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCurrentUser", null);
UserController = __decorate([
    inversify_express_utils_1.controller("/users"),
    __param(0, inversify_1.inject(types_1.TYPE.UserAccountService)),
    __param(1, inversify_1.inject(types_1.TYPE.TokenService)),
    __param(2, inversify_1.inject(types_1.TYPE.RoleService)),
    __metadata("design:paramtypes", [UserAccountService_1.UserAccountService,
        TokenService_1.TokenService,
        RoleService_1.RoleService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map
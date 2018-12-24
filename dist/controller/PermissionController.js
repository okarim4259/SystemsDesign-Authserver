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
const inversify_express_utils_1 = require("inversify-express-utils");
const UserAccountService_1 = require("../service/UserAccountService");
const RoleService_1 = require("../service/RoleService");
const inversify_1 = require("inversify");
const types_1 = require("../config/typeBindings/types");
const express = require("express");
const HTTP_1 = require("../utility/HTTP");
let PermissionController = class PermissionController {
    constructor(userAccountService, roleService) {
        this._userAccountService = userAccountService;
        this._roleService = roleService;
    }
    checkPermissions(roleId, dummy, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rolePermissions = yield this._roleService.getPermission(roleId);
                return res.status(HTTP_1.HttpStatus.OK).json(rolePermissions);
            }
            catch (err) {
                return res
                    .status(HTTP_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ err: "Oops Something went wrong!!!" });
            }
        });
    }
};
__decorate([
    inversify_express_utils_1.httpGet("/check/:roleId"),
    __param(0, inversify_express_utils_1.requestParam("roleId")),
    __param(1, inversify_express_utils_1.requestParam("dummy")),
    __param(2, inversify_express_utils_1.request()),
    __param(3, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "checkPermissions", null);
PermissionController = __decorate([
    inversify_express_utils_1.controller("/permissions"),
    __param(0, inversify_1.inject(types_1.TYPE.UserAccountService)),
    __param(1, inversify_1.inject(types_1.TYPE.RoleService)),
    __metadata("design:paramtypes", [UserAccountService_1.UserAccountService,
        RoleService_1.RoleService])
], PermissionController);
exports.PermissionController = PermissionController;
//# sourceMappingURL=PermissionController.js.map
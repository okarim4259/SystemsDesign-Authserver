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
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const types_1 = require("../../config/typeBindings/types");
let UserAccountDAO = class UserAccountDAO {
    constructor(userAccountRepository) {
        this._userAccountRepository = userAccountRepository;
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._userAccountRepository.find();
        });
    }
    findByUserId(_userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._userAccountRepository.findOne({ where: { userId: _userId } });
        });
    }
    findByUserName(_userName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._userAccountRepository.findOne({
                where: { userName: _userName }
            });
        });
    }
    findByEmail(_email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._userAccountRepository.findOne({ where: { email: _email } });
        });
    }
    createNewUser(_newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = this._userAccountRepository.create(_newUser);
            return this._userAccountRepository.save(createdUser);
        });
    }
    getUserRoles(_userRefId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._userAccountRepository.findOne({
                relations: ["roles"],
                where: { id: _userRefId }
            });
            return user.roles;
        });
    }
};
UserAccountDAO = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPE.UserAccountRepository)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserAccountDAO);
exports.UserAccountDAO = UserAccountDAO;
//# sourceMappingURL=UserAccountDAO.js.map
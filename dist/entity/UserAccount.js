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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const IUserAccountType_1 = require("../domain/IUserAccountType");
const Role_1 = require("./Role");
let UserAccount = class UserAccount extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("increment"),
    __metadata("design:type", Number)
], UserAccount.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.Generated("uuid"),
    __metadata("design:type", String)
], UserAccount.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50, unique: true }),
    __metadata("design:type", String)
], UserAccount.prototype, "userName", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50 }),
    __metadata("design:type", String)
], UserAccount.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50 }),
    __metadata("design:type", String)
], UserAccount.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 50 }),
    __metadata("design:type", String)
], UserAccount.prototype, "email", void 0);
__decorate([
    typeorm_1.Column("varchar"),
    __metadata("design:type", String)
], UserAccount.prototype, "password", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], UserAccount.prototype, "accountType", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Role_1.Role),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], UserAccount.prototype, "roles", void 0);
UserAccount = __decorate([
    typeorm_1.Entity()
], UserAccount);
exports.UserAccount = UserAccount;
//# sourceMappingURL=UserAccount.js.map
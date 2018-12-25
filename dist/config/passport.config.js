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
const passport = require("passport");
const bcrypt = require("bcryptjs");
const passport_jwt_1 = require("passport-jwt");
const UserAccount_1 = require("../entity/UserAccount");
const Logger_1 = require("../utility/Logger");
const constants_config_1 = require("./constants/constants.config");
const IUserAccountType_1 = require("../domain/IUserAccountType");
const Role_1 = require("../entity/Role");
const ERoles_1 = require("../utility/ERoles");
passport.use("local", new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: constants_config_1.KEYS.JWT_SECRET
}, (jwt_payload, done) => {
    UserAccount_1.UserAccount.findOne({ where: { userId: jwt_payload.sub } })
        .then(user => {
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    })
        .catch(err => Logger_1.logger.error("Excepetion in JWT Strategy: " + err));
}));
// const GoogleStrategy = require("passport-google-oauth2").Strategy;
const GoogleStrategy = require("passport-google-plus-token");
passport.use("google-oauth2", new GoogleStrategy({
    clientID: constants_config_1.KEYS.GOOGLE_OAUTH2_CLIENT_ID,
    clientSecret: constants_config_1.KEYS.GOOGLE_OAUTH2_CLIENT_SECRET
}, (accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
    try {
        UserAccount_1.UserAccount.findOne({ where: { googleAccountId: profile.id } })
            .then((user) => __awaiter(this, void 0, void 0, function* () {
            if (user) {
                const userResponse = {
                    userId: user.userId,
                    userName: user.userName,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    accountType: user.accountType,
                    additionalInfo: profile
                };
                return done(null, userResponse);
            }
            else {
                const roles = [
                    yield Role_1.Role.findOne({ where: { name: ERoles_1.ERoles.USER } })
                ];
                const newUser = {
                    userName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    password: yield bcrypt.hash(profile.id, 10),
                    accountType: IUserAccountType_1.IUserAccountType.google,
                    roles: roles,
                    googleAccountId: profile.id
                };
                const createdUser = UserAccount_1.UserAccount.create(newUser);
                const registerNewUser = yield UserAccount_1.UserAccount.save(createdUser);
                const userResponse = {
                    userId: registerNewUser.userId,
                    userName: registerNewUser.userName,
                    firstName: registerNewUser.firstName,
                    lastName: registerNewUser.lastName,
                    email: registerNewUser.email,
                    accountType: registerNewUser.accountType,
                    additionalInfo: profile
                };
                return done(null, userResponse);
            }
        }))
            .catch(err => {
            Logger_1.logger.error("Exception in Google OAuth: " + err);
            done(err, false, err.message);
        });
    }
    catch (err) {
        done(err, false, err.message);
    }
})));
//# sourceMappingURL=passport.config.js.map
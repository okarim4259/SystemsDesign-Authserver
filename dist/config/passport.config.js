"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passport_jwt_1 = require("passport-jwt");
const UserAccount_1 = require("../entity/UserAccount");
const Logger_1 = require("../utility/Logger");
const constants_config_1 = require("./constants/constants.config");
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
//# sourceMappingURL=passport.config.js.map
import * as passport from "passport";
import * as jwt from "jsonwebtoken";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserAccount } from "../entity/UserAccount";
import { logger } from "../utility/Logger";
import { KEYS } from "./constants/constants.config";

passport.use(
  "local",
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: KEYS.JWT_SECRET
    },
    (jwt_payload, done) => {
      UserAccount.findOne({ where: { userId: jwt_payload.sub } })
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => logger.error("Excepetion in JWT Strategy: " + err));
    }
  )
);

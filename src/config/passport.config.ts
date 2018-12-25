import * as passport from "passport";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserAccount } from "../entity/UserAccount";
import { logger } from "../utility/Logger";
import { KEYS } from "./constants/constants.config";
import { IUserAccount } from "../domain/IUserAccount";
import { IUserAccountType } from "../domain/IUserAccountType";
import { Role } from "../entity/Role";
import { ERoles } from "../utility/ERoles";
import { IUserResponse } from "../domain/IUserResponse";

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

// const GoogleStrategy = require("passport-google-oauth2").Strategy;

const GoogleStrategy = require("passport-google-plus-token");
passport.use(
  "google-oauth2",
  new GoogleStrategy(
    {
      clientID: KEYS.GOOGLE_OAUTH2_CLIENT_ID,
      clientSecret: KEYS.GOOGLE_OAUTH2_CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        UserAccount.findOne({ where: { googleAccountId: profile.id } })
          .then(async user => {
            if (user) {
              const userResponse: IUserResponse = {
                userId: user.userId,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                accountType: user.accountType,
                additionalInfo: profile
              };
              return done(null, userResponse);
            } else {
              const roles: Role[] = [
                await Role.findOne({ where: { name: ERoles.USER } })
              ];
              const newUser: IUserAccount = {
                userName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                password: await bcrypt.hash(profile.id, 10),
                accountType: IUserAccountType.google,
                roles: roles,
                googleAccountId: profile.id
              };
              const createdUser = UserAccount.create(newUser);
              const registerNewUser = await UserAccount.save(createdUser);

              const userResponse: IUserResponse = {
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
          })
          .catch(err => {
            logger.error("Exception in Google OAuth: " + err);
            done(err, false, err.message);
          });
      } catch (err) {
        done(err, false, err.message);
      }
    }
  )
);

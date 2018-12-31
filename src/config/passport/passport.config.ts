import * as passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PROPERTIES } from "../properties/properties";
import { UserAccount } from "../../entity/UserAccount";
import { logger } from "../../utility/Logger";
import { IUserInfoContext } from "../../domain/user/IUserInfoContext";
import { Role } from "../../entity/Role";
import { ERoles } from "../../domain/helpers/ERoles";
import { INewUserRequest } from "../../domain/user/INewUserRequest";
import * as bcrypt from "bcryptjs";
import { EUserAccountType } from "../../domain/helpers/EUserAccountType";
passport.use(
  "context",
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: PROPERTIES.JWT_SECRET
    },
    (_jwtPayload, done) => {
      UserAccount.findOne({ where: { userId: _jwtPayload.sub } })
        .then(user => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch(err => logger.error(`Exception parsing jwt token ${err}`));
    }
  )
);

const GoogleStrategy = require("passport-google-plus-token");
passport.use(
  "google-oauth2",
  new GoogleStrategy(
    {
      clientID: PROPERTIES.GOOGLE_OAUTH2_CLIENT_ID,
      clientSecret: PROPERTIES.GOOGLE_OAUTH2_CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        UserAccount.findOne({ where: { googleAccountId: profile.id } }).then(
          async user => {
            if (user) {
              const userResponse: IUserInfoContext = {
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
              const newGoogleAccountUser: INewUserRequest = {
                userName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                password: await bcrypt.hash(profile.id, 10),
                accountType: EUserAccountType.google,
                roles: roles,
                googleAccountId: profile.id
              };

              const createdUser = UserAccount.create(newGoogleAccountUser);
              const registerNewUser = await UserAccount.save(createdUser);

              const userReponse: IUserInfoContext = {
                userId: registerNewUser.userId,
                userName: registerNewUser.userName,
                firstName: registerNewUser.firstName,
                lastName: registerNewUser.lastName,
                email: registerNewUser.email,
                accountType: registerNewUser.accountType,
                additionalInfo: profile
              };
              return done(null, userReponse);
            }
          }
        );
      } catch (err) {
        logger.error(err);
      }
    }
  )
);

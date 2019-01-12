import * as passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PROPERTIES } from "../properties/properties";
import { UserAccount } from "../../entity/UserAccount";
import { logger } from "../../utility/Logger";
import { IUserInfoContext } from "../../domain/user/IUserInfoContext";
import { Role } from "../../entity/Role";
import { ERoles } from "../../domain/helpers/ERoles";
import { INewUserRequest } from "../../domain/user/INewUserRequest";
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

const FavebookStrategy = require("passport-facebook-token");
passport.use(
  "facebook-oauth2",
  new FavebookStrategy(
    {
      clientID: PROPERTIES.FACEBOOK.FACEBOOK_APP_ID,
      clientSecret: PROPERTIES.FACEBOOK.FACEBOOK_APP_SECRET,
      profileFields: [
        "id",
        "displayName",
        "email",
        "first_name",
        "middle_name",
        "last_name"
      ]
    },
    async (accessToken, refreshToken, profile, done) => {
      UserAccount.findOne({ where: { externalProviderId: profile.id } })
        .then(async user => {
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
            let fb_email = null;
            if (profile.emails[0].value) {
              fb_email = profile.emails[0].value;
            }
            const newFacebookAccountUser: INewUserRequest = {
              userName: profile.displayName,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              email: fb_email,
              password: null,
              accountType: EUserAccountType.facebook,
              roles: roles,
              externalProviderId: profile.id
            };
            const createdUser = UserAccount.create(newFacebookAccountUser);
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
            logger.info("Received google sign in request");
            return done(null, userReponse);
          }
        })
        .catch(err => {
          logger.error(err);
          done(null, false);
        });
    }
  )
);

const GoogleStrategy = require("passport-google-plus-token");
passport.use(
  "google-oauth2",
  new GoogleStrategy(
    {
      clientID: PROPERTIES.GOOGLE.GOOGLE_OAUTH2_CLIENT_ID,
      clientSecret: PROPERTIES.GOOGLE.GOOGLE_OAUTH2_CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        UserAccount.findOne({ where: { externalProviderId: profile.id } }).then(
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
              logger.info("Received google sign in request");
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
                password: null,
                accountType: EUserAccountType.google,
                roles: roles,
                externalProviderId: profile.id
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
              logger.info("Received google sign in request");
              return done(null, userReponse);
            }
          }
        );
      } catch (err) {
        logger.error(err);
        done(null, false);
      }
    }
  )
);

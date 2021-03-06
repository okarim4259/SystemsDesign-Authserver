export const PROPERTIES = {
  ISSUER: process.env.ISSUER,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXP: process.env.JWT_EXP,
  GOOGLE: {
    GOOGLE_PROJ_ID: process.env.GOOGLE_PROJ_ID,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    GOOGLE_OAUTH2_CLIENT_ID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
    GOOGLE_OAUTH2_CLIENT_SECRET: process.env.GOOGLE_OAUTH2_CLIENT_SECRET
  },
  FACEBOOK: {
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET
  }
};

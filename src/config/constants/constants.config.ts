// export const KEYS = {
//   ISSUER: "okarimdev",
//   JWT_SECRET: "developmentJwtSecret",
//   JWT_EXP: 360000,
//   GOOGLE_PROJ_ID: "budgetplanner-214602",
//   GOOGLE_API_KEY: "AIzaSyAv9WELjIqtsH8FgcG2egs4RdVQ4P2JRPY",
//   GOOGLE_OAUTH2_CLIENT_ID:
//     "287841994105-vr5v909v8217b02fl4pkbp4o0ab9h02r.apps.googleusercontent.com",
//   GOOGLE_OAUTH2_CLIENT_SECRET: "mhPlFoLZdBsfTFVkl9RJ64dW"
// };
export const KEYS = {
  ISSUER: process.env.ISSUER,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXP: process.env.JWT_EXP,
  GOOGLE_PROJ_ID: process.env.GOOGLE_PROJ_ID,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  GOOGLE_OAUTH2_CLIENT_ID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
  GOOGLE_OAUTH2_CLIENT_SECRET: process.env.GOOGLE_OAUTH2_CLIENT_SECRET
};

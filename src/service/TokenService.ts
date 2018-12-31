import { injectable } from "inversify";
import * as jwt from "jsonwebtoken";
import { PROPERTIES } from "../config/properties/properties";

@injectable()
export class TokenService {
  public generateUserAccessToken(_userId, _email) {
    const jwtPayload = {
      ISSUER: PROPERTIES.ISSUER,
      sub: _userId,
      email: _email
    };
    return jwt.sign(jwtPayload, PROPERTIES.JWT_SECRET, {
      expiresIn: PROPERTIES.JWT_EXP
    });
  }
}

import { injectable, inject } from "inversify";
import * as jwt from "jsonwebtoken";
import { KEYS } from "../config/constants/constants.config";
import { logger } from "../utility/Logger";

@injectable()
export class TokenService {
  constructor() {}

  public async generateUserAccessToken(_payload) {
    try {
      return jwt.sign(_payload, KEYS.JWT_SECRET, { expiresIn: KEYS.JWT_EXP });
    } catch (err) {
      logger.error("Could not initialize jwt token");
    }
  }
}

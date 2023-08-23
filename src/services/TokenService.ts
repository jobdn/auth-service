import jwt from "jsonwebtoken";
import { UserInDB, UserInfoSchema } from "../types/User.js";

const ACCESS_SECRET = "secret_for_access_token";
const REFRESH_SECRET = "secret_for_refresh_token";

class TokenService {
  generateTokens(payload: UserInfoSchema) {
    const accessToken = jwt.sign(payload, ACCESS_SECRET, {
      expiresIn: "15s",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
      expiresIn: "30s",
    });

    return { accessToken, refreshToken };
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, REFRESH_SECRET) as UserInfoSchema;

      return userData;
    } catch (error) {
      console.log("Error", error);

      return null;
    }
  }

  saveRefreshToken(user: UserInDB, refreshToken: string) {
    user.tokens.refreshToken = refreshToken;
  }
}

export const tokenService = new TokenService();

import { users } from "../constants.js";
import { UserInfoSchema } from "../types/User.js";
import { tokenService } from "./TokenService.js";
import { UserDto } from "../dto/UserDTO.js";

function getUserByLogin(email: string) {
  return users.find((user) => user.login === email);
}

function getUserByRefreshToken(token: string) {
  return users.find((user) => user.tokens.refreshToken === token);
}

class UserService {
  async loginFn(login: string, password: string) {
    const user = getUserByLogin(login);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== password) {
      throw new Error("Wrong password");
    }

    const userInfo: UserInfoSchema = {
      id: user.id,
      name: user.name,
      surname: user.surname,
    };
    const tokens = tokenService.generateTokens(userInfo);
    tokenService.saveRefreshToken(user, tokens.refreshToken);

    return {
      tokens,
      userInfo,
      authorities: user.authorities,
    };
  }

  async logoutFn(refreshToken: string) {
    const user = getUserByRefreshToken(refreshToken);

    if (!user) {
      throw new Error("User not found");
    }

    user.tokens.refreshToken = "";
    user.tokens.accessToken = "";
  }

  async getUserByEmail(email: string) {
    const user = getUserByLogin(email);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async refresh(token: string) {
    const userInfo = tokenService.validateRefreshToken(token);

    if (!userInfo) {
      throw new Error("Not a valid refresh token");
    }

    const userFromDB = userService.getUserById(userInfo.id);

    if (!userFromDB || token !== userFromDB.tokens.refreshToken) {
      throw new Error("Refresh token not equal to token in DB");
    }

    const userDto = new UserDto(userInfo);

    const newTokens = tokenService.generateTokens({ ...userDto });
    tokenService.saveRefreshToken(userFromDB, newTokens.refreshToken);

    return {
      tokens: newTokens,
      userInfo: userDto,
      authorities: userFromDB.authorities,
    };
  }

  getUserById(id: string) {
    return users.find((user) => user.id === id);
  }
}

export const userService = new UserService();

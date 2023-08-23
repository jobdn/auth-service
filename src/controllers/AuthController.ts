import { NextFunction, Request, Response } from "express";
import { userService } from "../services/UserService.js";

import {
  BadLoginResponse,
  LoginRequestBody,
  SuccessLoginResponse,
  TypedRequest,
} from "../types/Http.js";
import { THIRTY_DAYS } from "../constants.js";

class AuthController {
  async login(
    req: TypedRequest<LoginRequestBody>,
    res: Response<SuccessLoginResponse | BadLoginResponse>,
    next: NextFunction
  ) {
    try {
      console.log("body: ", req.body);
      if (!req.body || !req.body.login || !req.body.password)
        return res
          .status(400)
          .json({ reason: "There is not login or password" });

      const { login, password } = req.body;
      const userData = await userService.loginFn(login, password);

      res.cookie("refreshToken", userData.tokens.refreshToken, {
        maxAge: THIRTY_DAYS,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ reason: error.message });
      }

      return res.status(500).json({ reason: "Internal server error" });
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;

      await userService.logoutFn(refreshToken);
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Logout was successful" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ reason: error.message, status: 400 });
      }

      return res
        .status(500)
        .json({ reason: "Internal server error", status: 500 });
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      console.log("refreshToken: ", refreshToken);

      if (!refreshToken) {
        return res
          .status(401)
          .json({ message: "There is not refresh token in request" });
      }

      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.tokens.refreshToken, {
        maxAge: THIRTY_DAYS,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ reason: error.message });
      }
    }
  }
}

export const authController = new AuthController();

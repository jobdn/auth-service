import { NextFunction, Request, Response } from "express";
import { userService } from "../services/UserService.js";

class UserController {
  async userByEmail(req: Request<{ email: string }>, res: Response) {
    try {
      const { email } = req.params;
      console.log("userByEmail cookies: ", req.cookies);

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const user = await userService.getUserByEmail(email);
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ reason: error.message });
      }

      return res.status(500).json({ reason: "Server error" });
    }
  }
}

export const userController = new UserController();

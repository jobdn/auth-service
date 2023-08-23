import { NextFunction, Request, Response } from "express";
import { tokenService } from "../services/TokenService.js";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers;
    console.log("authorization: ", authorization);

    if (!authorization) {
      return res.status(401).json({ error: "Authorization header is requied" });
    }

    const accessToken = authorization.split(" ")[1];

    console.log("Access token: " + accessToken);

    if (!accessToken) {
      return res.status(401).json({ error: "Access token is requied" });
    }

    const userData = tokenService.validateAccessToken(accessToken);
    console.log("User data: " + userData);

    if (!userData) {
      return res
        .status(401)
        .json({ error: "Access token checking returned null" });
    }

    next();
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return res.status(401).json({ error: error.message });
    }
    return res.status(401).json({ error: "Invalid access token" });
  }
}

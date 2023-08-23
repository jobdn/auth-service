import { Request } from "express";
import { components, paths } from "../schemas/auth-schema.js";
export interface TypedRequest<T> extends Request {
  body: T;
}

// Login
export type LoginRequestBody = components["schemas"]["loginPasswordRequest"];
export type SuccessLoginResponse =
  paths["/api/auth-service/login"]["post"]["responses"][200]["content"]["application/json"];
export type BadLoginResponse = { reason: string };

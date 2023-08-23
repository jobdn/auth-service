import { components } from "../schemas/auth-schema.js";
import { Tokens } from "./Tokens.js";

export type UserInfoSchema = components["schemas"]["userInfo"];

export interface UserInDB extends UserInfoSchema {
  password: string;
  authorities: string[];
  login: string;
  tokens: Tokens & { refreshToken: string };
}

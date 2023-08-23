import { UserInDB } from "./types/User.js";

const user: UserInDB = {
  id: "1",
  name: "Dan",
  surname: "Pisarev",
  password: "123",
  authorities: ["USER"],
  login: "user@gmail.com",
  tokens: {
    refreshToken: "",
    accessToken: "",
  },
};

const admin: UserInDB = {
  id: "2",
  name: "Igor",
  surname: "Fuckin",
  password: "123",
  authorities: ["ADMIN"],
  login: "admin@gmail.com",
  tokens: {
    refreshToken: "",
    accessToken: "",
  },
};

export const users: UserInDB[] = [user, admin];

export const THIRTY_DAYS = 30 * 24 * 60 * 60;

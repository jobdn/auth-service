import { UserInDB, UserInfoSchema } from "../types/User.js";

export class UserDto {
  id: string;
  name: string;
  surname: string;

  constructor(model: UserInfoSchema) {
    this.id = model.id;
    this.name = model.name;
    this.surname = model.surname;
  }
}

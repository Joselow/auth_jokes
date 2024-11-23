import { UserSchema } from "./index.js";

import { USER_ROLES } from "../enums/UserRoles.js";

import type { ResponseService } from "../interfaces/types.js";
import type { UserPrivate, UserPublic } from "../interfaces/User.js";

const findUser = (value: string) => {  
  return UserSchema.findOne((user: UserPrivate) => user.username === value || 
    user.email === value || user.uuid === value
  );
}

const createUser = (user: UserPrivate): UserPublic => {
  UserSchema.create(user).save()
  const { password, ...otherFields } = user
  return otherFields
}

const findUserByUsernameOrEmail = (username: string, email: string) => {
  return UserSchema.find((user: UserPrivate) => user.username === username || user.email === email);
};

const switchRole = (uuid: string): ResponseService => {
  const user = UserSchema.findOne({ uuid });

  if (!user) return { ok: false , data: null};

  const newRole = user.role === USER_ROLES.GOD 
    ? USER_ROLES.MORTAL 
    : USER_ROLES.GOD

  user.role = newRole
  user.save();

  return { ok: true , data: newRole};
}

export const AuthService = {
  findUser, createUser, switchRole, findUserByUsernameOrEmail
}
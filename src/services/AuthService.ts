import { UserSchema } from ".";

import { USER_ROLES } from "../enums/UserRoles";

import type { ResponseService } from "../interfaces/types";
import type { UniqueUserFields, UserPrivate, UserPublic } from "../interfaces/User";

const findUser = (value: string) => {
  const fields: UniqueUserFields [] = ['uuid', 'username', 'email'];

  for (const field of fields) {
    const user = UserSchema.findOne({ [field]: value });
    if (user)  return user ?? null
  }
}

const createUser = (user: UserPrivate): UserPublic => {
  UserSchema.create(user).save()
  const { password, ...otherFields } = user
  return otherFields
}

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
  findUser, createUser, switchRole
}
import { UniqueUserFields, UserPrivate, UserPublic } from "../interfaces/User";

import DbLocal from 'db-local'

const { Schema } = new DbLocal({ path: './db' })

const UserSchema = Schema('User', {
  uuid: { required: true, type: String },
  username: { required: true, type: String },
  email: { required: true, type: String },
  password: { required: true, type: String }
})

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

export const AuthService = {
  findUser, createUser
}
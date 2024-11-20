import { UserSchema } from "."

const getUsers = () => {
    return UserSchema.find()
}

export const UserService = {
  getUsers
}
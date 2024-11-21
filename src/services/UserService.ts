import { UserSchema } from "./index.js"

const getUsers = () => {
    return UserSchema.find()
}

export const UserService = {
  getUsers
}
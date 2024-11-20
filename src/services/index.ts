import DbLocal from 'db-local'

const { Schema } = new DbLocal({ path: './db' })

export const UserSchema = Schema('User', {
  uuid: { required: true, type: String },
  username: { required: true, type: String },
  email: { required: true, type: String },
  password: { required: true, type: String },
  role: { required: true, type: Number },
})

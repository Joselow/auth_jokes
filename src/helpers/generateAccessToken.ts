import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const generateAccessToken = (data: any) => {
  return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1h' })
}
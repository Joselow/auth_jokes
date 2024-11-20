import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const generateAccessToken = (data: any): string => {
  return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1h' })
}

export const verifyAccessToken = (token: string): any => {
  const data = jwt.verify(token, process.env.SECRET_KEY)
  return data
}
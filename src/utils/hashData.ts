import bcrypt  from 'bcrypt';

export const hashData = async (data: string) => {
  const salt = 10
  return await bcrypt.hash(data, salt)
}

export const comparePasswordHashed = async (value: string, hashed: string) => {  
  return await bcrypt.compare(value, hashed)
}
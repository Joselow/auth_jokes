import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6).max(72),
})

export const verifyRegisterSchema = async(data: any) =>{
  return await RegisterSchema.safeParseAsync(data)
}

export const LoginSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string()
}).refine(  
  data => data.username || data.email,
  {
    message: "You should provide at least 'username' or 'email'.",
    path: ["username", "email"], 
  }
) 

export const verifyLoginSchema = async(data: any) =>{
  return await LoginSchema.safeParseAsync(data)
}
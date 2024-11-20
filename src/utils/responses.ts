import { Response } from "express";

export const success = ( res: Response, status: number, message: string, data: any ) =>{
  res.status(status).json({
    ...(message && { message }),
    success: true,
    data
  });
}

export const error = (res: Response, status: number, message: string, errors?: any) => {
  console.log('respuesta error');
  
  res.status(status).json({
    success: false,
    message: status === 500 ? 'Internal Server Error' : message,
    ...(errors && { errors })
  });
}
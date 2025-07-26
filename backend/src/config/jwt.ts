import jwt from 'jsonwebtoken'
import { DecodedToken } from '../middleware/auth'

export const generateAccessToken = (userId:string) => {
  return jwt.sign({userId},process.env.JWT_ACCESS_SECRET as string,{expiresIn:'1min'})
}

export const generateRefreshToken =(userId:string) => {
  return jwt.sign({userId},process.env.JWT_REFRESH_SECRET as string,{expiresIn:"7d"})
}

export const verifyAccessToken = (token:string):DecodedToken => {
  return jwt.verify(token,process.env.JWT_ACCESS_SECRET! )as DecodedToken
}

export const verifyRefreshToken =(token:string) => {
  return jwt.verify(token,process.env.JWT_REFRESH_SECRET as string)
}
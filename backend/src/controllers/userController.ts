import { Request, Response } from 'express';
import { IUserService } from '../interfaces/service.interface';
import { response } from '../utils/response';
import { generateAccessToken, generateRefreshToken } from '../config/jwt';
import { IUserController } from '../interfaces/controller.interface';

export class UserController implements IUserController {
  constructor(private userService: IUserService) {}

  async register(req: Request, res: Response) {
    try {
      console.log("reached here")
      const user = await this.userService.register(req.body);
      if(!user._id){
        throw new Error("Something went wrong")
      }
      const accessToken = generateAccessToken(user._id.toString());
      const refreshToken = generateRefreshToken(user._id.toString());
      return response(res, 201, 'User registered successfully', { accessToken, refreshToken });
    } catch (error: any) {
      return response(res, 400, error.message);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const user = await this.userService.login(req.body);
      if(!user._id){
        throw new Error("Something went wrong")
      }
      const accessToken = generateAccessToken(user._id.toString());
      const refreshToken = generateRefreshToken(user._id.toString());
      return response(res, 200, 'Login successful', { accessToken, refreshToken });
    } catch (error: any) {
      return response(res, 401, error.message);
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const user = await this.userService.refreshToken(refreshToken);
      if(!user._id){
        throw new Error("Something went wrong")
      }
      const accessToken = generateAccessToken(user._id.toString());
      return response(res, 200, 'Token refreshed successfully', { accessToken });
    } catch (error: any) {
      return response(res, 401, error.message);
    }
  }
}
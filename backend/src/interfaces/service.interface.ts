import { IUser } from "./user.interface";

export interface IUserService {
  register(user: IUser): Promise<IUser>;
  login(credentials: { email: string; password: string }): Promise<IUser>;
  refreshToken(refreshToken: string): Promise<IUser>;
}
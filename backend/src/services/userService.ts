import { IUserService} from '../interfaces/service.interface';
import { IUser } from '../interfaces/user.interface';
import { IUserRepository } from '../interfaces/repository.interface';
import { validateUser } from '../utils/validator';
import bcrypt from 'bcrypt';
import { verifyRefreshToken } from '../config/jwt';

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async register(user: IUser): Promise<IUser> {
    validateUser(user);
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) throw new Error('Email already exists');
    user.password = await bcrypt.hash(user.password, 10);
    return this.userRepository.create(user);
  }

  async login(credentials: { email: string; password: string }): Promise<IUser> {
    const user = await this.userRepository.findByEmail(credentials.email);
    if (!user) throw new Error('No User Exist');
    const isValid = await bcrypt.compare(credentials.password, user.password);
    console.log(isValid)
    if (!isValid) throw new Error('Invalid credentials');
    return user;
  }

  async refreshToken(refreshToken: string): Promise<IUser> {
    try {
      const decoded = verifyRefreshToken(refreshToken) as { userId: string };
      const user = await this.userRepository.findById(decoded.userId)
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}
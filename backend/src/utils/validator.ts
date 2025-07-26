import { IUser } from '../interfaces/user.interface';

export const validateUser = (user: IUser) => {
  if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    throw new Error('Invalid email');
  }
  if (!user.password || user.password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
  if (!user.name) throw new Error('Name is required');
};
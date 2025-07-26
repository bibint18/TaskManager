import { User } from '../models/user.model';
import { IUserRepository} from '../interfaces/repository.interface';
import { IUser } from '../interfaces/user.interface';

export class UserRepository implements IUserRepository {
  async create(user: IUser): Promise<IUser> {
    return User.create(user);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).exec();
  }

  async findById(id:string):Promise<IUser | null>{
    return User.findById(id).exec()
  }
}
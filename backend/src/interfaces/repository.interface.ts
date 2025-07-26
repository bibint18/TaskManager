import { ITask } from './task.interface';
import { IUser } from './user.interface';

export interface IUserRepository {
  create(user: IUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id:string):Promise<IUser | null>
}
export interface ITaskRepository {
  findAll(userId: string): Promise<ITask[]>;
  create(task: ITask): Promise<ITask>;
  update(id: string, userId: string, task: Partial<ITask>): Promise<ITask>;
  delete(id: string, userId: string): Promise<void>;
}
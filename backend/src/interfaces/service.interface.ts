import { ITask } from "./task.interface";
import { IUser } from "./user.interface";

export interface IUserService {
  register(user: IUser): Promise<IUser>;
  login(credentials: { email: string; password: string }): Promise<IUser>;
  refreshToken(refreshToken: string): Promise<IUser>;
}

export interface ITaskService {
  getAllTasks(userId: string): Promise<ITask[]>;
  createTask(task: ITask): Promise<ITask>;
  updateTask(id: string, userId: string, task: Partial<ITask>): Promise<ITask>;
  deleteTask(id: string, userId: string): Promise<void>;
}
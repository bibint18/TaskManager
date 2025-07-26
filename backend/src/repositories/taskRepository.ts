import { Task } from '../models/task.model';
import { ITaskRepository} from '../interfaces/repository.interface';
import { ITask } from '../interfaces/task.interface';

export class TaskRepository implements ITaskRepository {
  async findAll(userId: string): Promise<ITask[]> {
    return Task.find({ userId }).exec();
  }

  async create(task: ITask): Promise<ITask> {
    return Task.create(task);
  }

  async update(id: string, userId: string, task: Partial<ITask>): Promise<ITask> {
    const updatedTask = await Task.findOneAndUpdate({ _id: id, userId }, task, { new: true });
    if (!updatedTask) throw new Error('Task not found or unauthorized');
    return updatedTask;
  }

  async delete(id: string, userId: string): Promise<void> {
    const result = await Task.findOneAndDelete({ _id: id, userId });
    if (!result) throw new Error('Task not found or unauthorized');
  }
}
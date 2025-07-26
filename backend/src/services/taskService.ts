import { ITaskService} from '../interfaces/service.interface';
import { ITask } from '../interfaces/task.interface';
import { ITaskRepository } from '../interfaces/repository.interface';
import { validateTask } from '../utils/validator';

export class TaskService implements ITaskService {
  constructor(private taskRepository: ITaskRepository) {}

  async getAllTasks(userId: string): Promise<ITask[]> {
    return this.taskRepository.findAll(userId);
  }

  async createTask(task: ITask): Promise<ITask> {
    validateTask(task);
    return this.taskRepository.create(task);
  }

  async updateTask(id: string, userId: string, task: Partial<ITask>): Promise<ITask> {
    validateTask(task, true);
    return this.taskRepository.update(id, userId, task);
  }

  async deleteTask(id: string, userId: string): Promise<void> {
    return this.taskRepository.delete(id, userId);
  }
}
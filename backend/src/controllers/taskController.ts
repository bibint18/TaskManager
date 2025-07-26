import { Request, Response } from 'express';
import { ITaskService } from '../interfaces/service.interface';
import { response } from '../utils/response';
import { ITaskController } from '../interfaces/controller.interface';

export class TaskController implements ITaskController {
  constructor(private taskService: ITaskService) {}
  async getAllTasks(req: Request, res: Response) {
    try {
      const userId = req.user?.userId as string
      const tasks = await this.taskService.getAllTasks(userId);
      return response(res, 200, 'Tasks retrieved successfully', tasks);
    } catch (error) {
      return response(res, 500, 'Server error');
    }
  }

  async createTask(req: Request, res: Response) {
    try {
      const userId = req.user?.userId as string;
      const task = await this.taskService.createTask({ ...req.body, userId });
      return response(res, 201, 'Task created successfully', task);
    } catch (error: any) {
      return response(res, 400, error.message);
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const userId = req.user?.userId as string
      const task = await this.taskService.updateTask(req.params.id, userId, req.body);
      return response(res, 200, 'Task updated successfully', task);
    } catch (error: any) {
      return response(res, 400, error.message);
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const userId = req.user?.userId as string
      await this.taskService.deleteTask(req.params.id, userId);
      return response(res, 200, 'Task deleted successfully');
    } catch (error: any) {
      return response(res, 400, error.message);
    }
  }
}
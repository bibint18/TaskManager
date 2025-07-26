import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { TaskService } from '../services/taskService';
import { TaskRepository } from '../repositories/taskRepository';
import { authenticate } from '../middleware/auth';

const router = Router();
const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);
router.get('/',authenticate,taskController.getAllTasks.bind(taskController))
router.post('/', authenticate,taskController.createTask.bind(taskController));
router.put('/:id', authenticate, taskController.updateTask.bind(taskController));
router.delete('/:id', authenticate, taskController.deleteTask.bind(taskController));


export default router;
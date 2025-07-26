import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { TaskService } from '../services/taskService';
import { TaskRepository } from '../repositories/taskRepository';
import { authenticate } from '../middleware/auth';

const router = Router();
const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

// router.get('/', authenticate, (req, res) => taskController.getAllTasks(req, res));
router.get('/',authenticate,taskController.getAllTasks.bind(taskController))
// router.post('/', authenticate, (req, res) => taskController.createTask(req, res));
router.post('/', authenticate,taskController.createTask.bind(taskController));
// router.put('/:id', authenticate, (req, res) => taskController.updateTask(req, res));
router.put('/:id', authenticate, taskController.updateTask.bind(taskController));
// router.delete('/:id', authenticate, (req, res) => taskController.deleteTask(req, res));
router.delete('/:id', authenticate, taskController.deleteTask.bind(taskController));


export default router;
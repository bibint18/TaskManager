import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { UserService } from '../services/userService';
import { UserRepository } from '../repositories/userRepository';

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
router.post('/register',userController.register.bind(userController))
router.post('/login', userController.login.bind(userController));
router.post('/refresh-token',userController.refreshToken.bind(userController))
export default router;
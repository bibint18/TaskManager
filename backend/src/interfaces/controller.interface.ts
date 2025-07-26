import {Request,Response} from 'express'

export interface IUserController{
  register(req:Request,res:Response): Promise<void>
  login(req: Request, res: Response): Promise<void>;
  refreshToken(req: Request, res: Response): Promise<void>;
}


export interface ITaskController {
  getAllTasks(req: Request, res: Response): Promise<void>;
  createTask(req: Request, res: Response): Promise<void>;
  updateTask(req: Request, res: Response): Promise<void>;
  deleteTask(req: Request, res: Response): Promise<void>;
}

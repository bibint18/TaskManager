import { ITask } from '../interfaces/task.interface';
import { IUser } from '../interfaces/user.interface';

export const validateUser = (user: IUser) => {
  if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    throw new Error('Invalid email');
  }
  if (!user.password || user.password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
  if (!user.name) throw new Error('Name is required');
};

export const validateTask = (task: Partial<ITask>, isUpdate = false) => {
  if (!isUpdate && !task.title) throw new Error('Title is required');
  if (!isUpdate && !task.due_date) throw new Error('Due date is required');
  if (task.due_date && isNaN(new Date(task.due_date).getTime())) {
    throw new Error('Invalid due date');
  }
  if (task.status && !['pending', 'in-progress', 'completed'].includes(task.status)) {
    throw new Error('Invalid status');
  }
};
import { Schema, model } from 'mongoose';
import { ITask } from '../interfaces/task.interface';

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  due_date: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  userId: { type: String, required: true },
});

export const Task = model<ITask>('Task', taskSchema);
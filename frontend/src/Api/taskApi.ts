import axiosInstance from './axiosInstance';
import { ITask } from '../types/task.types';

export const getTasks = async () => {
  const response = await axiosInstance.get('/tasks');
  return response.data.data;
};

export const createTask = async (task: Partial<ITask>) => {
  const response = await axiosInstance.post('/tasks', task);
  return response.data.data;
};

export const updateTask = async (id: string, task: Partial<ITask>) => {
  const response = await axiosInstance.put(`/tasks/${id}`, task);
  return response.data.data;
};

export const deleteTask = async (id: string) => {
  await axiosInstance.delete(`/tasks/${id}`);
};
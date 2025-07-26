
import React, { useState } from 'react';
import { ITask } from '../types/task.types';
import { useNavigate } from 'react-router-dom';
import { createTask,updateTask } from '../Api/taskApi';
import toast from 'react-hot-toast';

const TaskForm: React.FC<{ task?: ITask }> = ({ task }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.due_date.split('T')[0] || '');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; description?:string; dueDate?: string; general?: string }>({});
  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors: { title?: string; dueDate?: string } = {};
    const today = new Date().toISOString().split('T')[0];

    if (!title) {
      newErrors.title = 'Title is required';
    } else if (title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    if (!dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else if (dueDate < today) {
      newErrors.dueDate = 'Due date cannot be in the past';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    try {
      const formattedDueDate = new Date(dueDate);
      formattedDueDate.setHours(23, 59, 59, 999);
      const isoDueDate = formattedDueDate.toISOString();

      if (task) {
        await updateTask(task._id!, { title, description, due_date: isoDueDate, status: task.status });
      } else {
        await createTask({ title, description, due_date: isoDueDate, status: 'pending' });
      }
      navigate('/');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to save task';
      setErrors({ general: errorMessage });
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">{task ? 'Edit Task' : 'Add Task'}</h2>
      {errors.general && <p className="text-red-500 mb-4">{errors.general}</p>}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : ''
            }`}
            placeholder="Enter task title"
            required
            disabled={loading}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? 'border-red-500' : ''
            }`}
            placeholder="Enter task description"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={today}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.dueDate ? 'border-red-500' : ''
            }`}
            required
            disabled={loading}
          />
          {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        >
          {task ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
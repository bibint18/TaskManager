import React, { useState } from 'react';
import { ITask } from '../types/task.types';
import { useNavigate } from 'react-router-dom';
import { updateTask,deleteTask } from '../Api/taskApi';
import toast from 'react-hot-toast';

const TaskCard: React.FC<{ task: ITask }> = ({ task }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isOverdue = new Date(task.due_date) < new Date() && task.status !== 'completed';

  const handleStatusChange = async (status: ITask['status']) => {
    setLoading(true);
    try {
      await updateTask(task._id!, { status });
      window.location.reload(); // Refresh to reflect updated task
    } catch (err: any) {
      toast.error(err.message || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true);
      try {
        await deleteTask(task._id!);
        window.location.reload(); // Refresh to reflect deleted task
      } catch (err: any) {
        toast.error(err.message || 'Failed to delete task');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={`p-4 bg-white rounded-lg shadow-md ${isOverdue ? 'border-l-4 border-red-500' : ''}`}>
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-600">{task.description || 'No description'}</p>
      <p className="text-sm text-gray-500">Due: {new Date(task.due_date).toLocaleDateString()}</p>
      <select
        value={task.status}
        onChange={(e) => handleStatusChange(e.target.value as ITask['status'])}
        className="mt-2 p-1 border rounded"
        disabled={loading}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <div className="mt-2 flex space-x-2">
        <button
          onClick={() => navigate(`/edit-task/${task._id}`)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={loading}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
          disabled={loading}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
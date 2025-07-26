
import React, { useState } from 'react';
import { ITask } from '../types/task.types';
import { useNavigate } from 'react-router-dom';
import { updateTask,deleteTask } from '../Api/taskApi';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const TaskCard: React.FC<{ task: ITask }> = ({ task }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isOverdue = new Date(task.due_date) < new Date() && task.status !== 'completed';

  const handleStatusChange = async (status: ITask['status']) => {
    setLoading(true);
    try {
      await updateTask(task._id!, { status });
      window.location.reload();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this task?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      buttonsStyling: false,
      customClass: {
        popup: 'bg-white rounded-lg shadow-lg p-6',
        title: 'text-xl font-bold text-gray-800',
        htmlContainer: 'text-gray-600 mb-4',
        confirmButton:
          'bg-red-500 text-white font-medium px-4 py-2 rounded-md hover:bg-red-600 transition-colors mr-2',
        cancelButton:
          'bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-md hover:bg-gray-400 transition-colors',
      },
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        await deleteTask(task._id!);
        window.location.reload();
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Failed to delete task');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 ${
        isOverdue
          ? 'border-l-4 border-red-500'
          : task.status === 'pending'
          ? 'border-l-4 border-yellow-500'
          : task.status === 'in-progress'
          ? 'border-l-4 border-blue-500'
          : 'border-l-4 border-green-500'
      }`}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>
      <p className="text-gray-600 mb-3 line-clamp-2">{task.description || 'No description'}</p>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          Due: {new Date(task.due_date).toLocaleDateString()}
        </p>
        <div className="flex items-center space-x-2">
          {isOverdue && (
            <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
              Overdue
            </span>
          )}
          <span
            className={`text-xs font-medium px-2 py-1 rounded ${
              task.status === 'pending'
                ? 'text-yellow-600 bg-yellow-50'
                : task.status === 'in-progress'
                ? 'text-blue-600 bg-blue-50'
                : 'text-green-600 bg-green-50'
            }`}
          >
            {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
          </span>
        </div>
      </div>
      <select
        value={task.status}
        onChange={(e) => handleStatusChange(e.target.value as ITask['status'])}
        className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
        disabled={loading}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <div className="mt-4 flex space-x-3">
        <button
          onClick={() => navigate(`/edit-task/${task._id}`)}
          className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 transition"
          disabled={loading}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-400 transition"
          disabled={loading}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;



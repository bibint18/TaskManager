import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { ITask } from '../types/task.types';
import { getTasks } from '../Api/taskApi';
import toast from 'react-hot-toast';

const EditTaskPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<ITask | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      setError(null);
      try {
        const tasks = await getTasks();
        const foundTask = tasks.find((t: ITask) => t._id === id);
        if (foundTask) {
          setTask(foundTask);
        } else {
          setError('Task not found');
          toast.error('Task not found');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch task');
        toast.error(err.message || 'Failed to fetch task');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error || !task) return <p>{error || 'Task not found'}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <TaskForm task={task} />
    </div>
  );
};

export default EditTaskPage;
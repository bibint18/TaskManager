import React from 'react';
import { ITask } from '../types/task.types';
import TaskCard from './TaskCard';

const TaskList: React.FC<{ tasks: ITask[] }> = ({ tasks }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
import React from 'react';
import TaskForm from '../components/TaskForm';

const AddTaskPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <TaskForm />
    </div>
  );
};

export default AddTaskPage;
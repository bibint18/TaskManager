import React, { lazy } from 'react';
import { Routes, Route} from 'react-router-dom';
// import { useAppSelector } from '../redux/store/store';

const LoginPage = lazy(() => import('../Pages/LoginPage'));
const RegisterPage = lazy(() => import('../Pages/RegisterPage'));
const TaskListPage = lazy(() => import('../Pages/TaskListPage'));
const AddTaskPage = lazy(() => import('../Pages/AddTaskPage'));
const EditTaskPage = lazy(() => import('../Pages/EditTaskPage'));

const AppRoutes: React.FC = () => {
  // const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  return (
    <Routes>
      <Route path="/login" element={ <LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
       <Route path="/tasks" element={<TaskListPage/>} />
      <Route path="/add-task" element={<AddTaskPage />} />
      <Route path="/edit-task/:id" element={<EditTaskPage />} /> 
      {/* <Route path="/" element={<Navigate to={isAuthenticated ? "/tasks" : "/login"} />} /> */}
    </Routes>
  );
};

export default AppRoutes;
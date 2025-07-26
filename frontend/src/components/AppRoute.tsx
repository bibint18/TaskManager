import React, { lazy } from 'react';
import { Routes, Route} from 'react-router-dom';
import ProtectedRoute from '../Pages/ProtectedRoute';
const LoginPage = lazy(() => import('../Pages/LoginPage'));
const RegisterPage = lazy(() => import('../Pages/RegisterPage'));
const TaskListPage = lazy(() => import('../Pages/TaskListPage'));
const AddTaskPage = lazy(() => import('../Pages/AddTaskPage'));
const EditTaskPage = lazy(() => import('../Pages/EditTaskPage'));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={ <LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute/>}>
        <Route path="/tasks" element={<TaskListPage/>} />
      <Route path="/add-task" element={<AddTaskPage />} />
      <Route path="/edit-task/:id" element={<EditTaskPage />} /> 
      </Route>
    </Routes>
  );
};

export default AppRoutes;
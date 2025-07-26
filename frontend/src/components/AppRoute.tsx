import React, { lazy } from 'react';
import { Routes, Route} from 'react-router-dom';
// import { useAppSelector } from '../redux/store/store';

const LoginPage = lazy(() => import('../Pages/LoginPage'));
const RegisterPage = lazy(() => import('../Pages/RegisterPage'));
// const TaskListPage = lazy(() => import('../pages/TaskListPage'));
// const AddTaskPage = lazy(() => import('../pages/AddTaskPage'));
// const EditTaskPage = lazy(() => import('../pages/EditTaskPage'));

const AppRoutes: React.FC = () => {
  // const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  return (
    <Routes>
      <Route path="/login" element={ <LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* <Route path="/tasks" element={isAuthenticated ? <TaskListPage /> : <Navigate to="/login" />} />
      <Route path="/add-task" element={isAuthenticated ? <AddTaskPage /> : <Navigate to="/login" />} />
      <Route path="/edit-task/:id" element={isAuthenticated ? <EditTaskPage /> : <Navigate to="/login" />} /> */}
      {/* <Route path="/" element={<Navigate to={isAuthenticated ? "/tasks" : "/login"} />} /> */}
    </Routes>
  );
};

export default AppRoutes;
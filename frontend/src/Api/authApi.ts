// import axios from 'axios';

// export const register = async (user: { email: string; password: string; name: string }) => {
//   const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/auth/register`, user);
//   return response.data.data;
// };

// export const login = async (credentials: { email: string; password: string }) => {
//   const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/auth/login`, credentials);
//   return response.data.data;
// };


import axiosInstance from "./axiosInstance";

export const register = async (data: { name: string; email: string; password: string }) => {
  const response = await axiosInstance.post('/auth/register', data);
  return response.data.data;
};

export const login = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data.data;
};
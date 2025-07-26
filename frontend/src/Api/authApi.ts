
import axiosInstance from "./axiosInstance";

export const register = async (data: { name: string; email: string; password: string }) => {
  const response = await axiosInstance.post('/auth/register', data);
  return response.data.data;
};

export const login = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post('/auth/login', data);
  console.log('login api ',response)
  return response.data.data;
};
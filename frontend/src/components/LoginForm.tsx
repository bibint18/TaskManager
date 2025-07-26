import React, { useEffect, useState } from 'react';
import { useAppDispatch,useAppSelector } from '../redux/store/store';
import { loginTheUser } from '../redux/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { login } from '../Api/authApi';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const validateInputs = () => {
    const newErrors: { email?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    if (!validateInputs()) {
      setLoading(false);
      return;
    }
    try {
      const { accessToken, refreshToken } = await login({ email, password });
      dispatch(loginTheUser({ userId: 'user_id', name: 'User', email, accessToken, refreshToken }));
      navigate('/');
    } catch (err: any) {
      console.log('LoginForm error:', {
        message: err.message,
        response: err.response,
        data: err.response?.data,
        status: err.response?.status,
      });
      const errorMessage = err.response?.data?.message || 'An unexpected error occurred';
      setErrors({ general: errorMessage });
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {errors.general && <p className="text-red-500 mb-4">{errors.general}</p>}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : ''
            }`}
            placeholder="Enter your email"
            required
            disabled={loading}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : ''
              }`}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-blue-500 hover:underline hover:text-blue-600 transition-colors"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
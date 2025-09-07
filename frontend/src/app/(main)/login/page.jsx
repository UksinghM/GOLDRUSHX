'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth } from '@/components/AuthContext';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setError('');
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/user/authenticate', {
          email: values.username,
          password: values.password,
        });
        setIsLoading(false);
        login(response.data.token);
        router.push('/');
      } catch (err) {
        setIsLoading(false);
        setError(
          err.response?.data?.message || 'Login failed. Please check your credentials.'
        );
      }
    },
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://www.krishnajewellers.com/blog/wp-content/uploads/2021/12/Buy-Gold-Choker-Designs.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 bg-white/10 backdrop-blur-md border border-yellow-400/40 rounded-2xl shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/Final Logo.ico" alt="Logo" className="h-20 w-20" />
        </div>

        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-2">Welcome Back</h1>
        <p className="text-sm text-gray-200 text-center mb-6">
          Sign in to access your exclusive jewelry collections.
        </p>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-yellow-200 mb-1">Email address</label>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-yellow-400/50 rounded-md bg-black/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Enter your email"
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-xs text-red-400 mt-1">{formik.errors.username}</div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-yellow-200 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-yellow-400/50 rounded-md bg-black/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-xs text-red-400 mt-1">{formik.errors.password}</div>
            )}
          </div>

          <div className="flex justify-between text-sm text-gray-200 items-center">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-yellow-400" />
              Remember me
            </label>
            <Link href="#" className="text-yellow-300 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 text-black font-semibold py-2 rounded-md shadow-lg transition"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>

          {/* Google Sign In */}
          <button
            type="button"
            className="w-full border border-yellow-400 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-yellow-100 transition text-black font-medium"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
            Sign in with Google
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-200">
          Don't have an account?{' '}
          <Link href="/signup" className="text-yellow-300 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

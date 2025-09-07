'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function SignupPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Must contain an uppercase letter')
        .matches(/[0-9]/, 'Must contain a number')
        .matches(/[^A-Za-z0-9]/, 'Must contain a special character')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm your password'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setError('');
      setIsLoading(true);
      try {
        await axios.post('http://localhost:5000/user/add', {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        });
        setIsLoading(false);
        router.push('/login');
      } catch (err) {
        setIsLoading(false);
        setError(
          err.response?.data?.message || 'Signup failed. Please try again.'
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-lg p-8 sm:p-10 bg-white/10 backdrop-blur-md border border-yellow-400/40 rounded-2xl shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/Final Logo.ico" alt="Logo" className="h-20 w-20" />
        </div>

        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-2">Create Your Account</h1>
        <p className="text-sm text-gray-200 text-center mb-6">
          Join our jewelry family and unlock exclusive collections.
        </p>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Name section */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-yellow-200 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-yellow-400/50 rounded-md bg-black/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="First"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="text-xs text-red-400 mt-1">{formik.errors.firstName}</div>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-yellow-200 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-yellow-400/50 rounded-md bg-black/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                placeholder="Last"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="text-xs text-red-400 mt-1">{formik.errors.lastName}</div>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-yellow-200 mb-1">Email address</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-yellow-400/50 rounded-md bg-black/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-xs text-red-400 mt-1">{formik.errors.email}</div>
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
              placeholder="Create a password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-xs text-red-400 mt-1">{formik.errors.password}</div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-yellow-200 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-yellow-400/50 rounded-md bg-black/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Re-enter your password"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-xs text-red-400 mt-1">{formik.errors.confirmPassword}</div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 text-black font-semibold py-2 rounded-md shadow-lg transition"
          >
            {isLoading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-200">
          Already have an account?{' '}
          <Link href="/login" className="text-yellow-300 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

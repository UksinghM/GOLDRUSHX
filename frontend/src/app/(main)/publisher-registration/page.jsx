'use client';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import styled from 'styled-components';

// 🔹 Animated Fancy Button
const FancyButton = ({ children, ...props }) => {
  return (
    <StyledWrapper>
      <div className="buttons">
        <button className="btn" {...props}>
          <span />
          <p data-start="Good luck!" data-text="Start!" data-title={children} />
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .buttons {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }

  .buttons button {
    width: 200px;
    height: 55px;
    background-color: white;
    margin: 10px;
    color: #568fa6;
    position: relative;
    overflow: hidden;
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: 600;
    text-transform: uppercase;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
  }

  .buttons button:before,
  .buttons button:after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    background-color: #44d8a4;
    transition: all 0.3s cubic-bezier(0.35, 0.1, 0.25, 1);
  }

  .buttons button:before {
    right: 0;
    top: 0;
  }

  .buttons button:after {
    left: 0;
    bottom: 0;
  }

  .buttons button span {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }

  .buttons button span:before,
  .buttons button span:after {
    content: "";
    position: absolute;
    width: 2px;
    height: 0;
    background-color: #44d8a4;
    transition: all 0.3s;
  }

  .buttons button span:before {
    right: 0;
    top: 0;
  }

  .buttons button span:after {
    left: 0;
    bottom: 0;
  }

  .buttons button p {
    margin: 0;
    transition: all 0.4s;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .buttons button p:before,
  .buttons button p:after {
    position: absolute;
    width: 100%;
    transition: all 0.4s;
    z-index: 1;
    left: 0;
  }

  .buttons button p:before {
    content: attr(data-title);
    top: 50%;
    transform: translateY(-50%);
  }

  .buttons button p:after {
    content: attr(data-text);
    top: 150%;
    color: #44d8a4;
  }

  .buttons button:hover:before,
  .buttons button:hover:after {
    width: 100%;
  }

  .buttons button:hover span:before,
  .buttons button:hover span:after {
    height: 100%;
  }

  .buttons button:hover p:before {
    top: -50%;
    transform: rotate(5deg);
  }

  .buttons button:hover p:after {
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default function PublisherSignup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/publisher/register', form);
      toast.success('Registration submitted! Await admin approval.');
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* 🔹 Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 animate-gradient opacity-90"></div>
      <div className="absolute inset-0 backdrop-blur-md"></div>

      {/* 🔹 Floating Shapes for design */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-bounce"></div>
      <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-spin-slow"></div>

      {/* 🔹 Form Container */}
      <div className="relative max-w-md w-full bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-6">Publisher Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-700"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-700"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-700"
            />
          </div>

          {/* 🚀 Animated Button */}
          <FancyButton type="submit">Register</FancyButton>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/admin-login" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
            Log in here
          </a>
        </p>
      </div>

      {/* 🔹 Extra CSS */}
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

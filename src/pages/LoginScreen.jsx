// src/pages/LoginScreen.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiLockPasswordLine, RiMailLine } from 'react-icons/ri';
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin =async (e) => {
    e.preventDefault();
    // 1. Basic Validation (In a real app, use Formik/React Hook Form)
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    
    // const url = `https://devserver-main--umsbackend.netlify.app/api/v1/login`;

    //             try {
    //                 const response = await axios(url, {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         'Accept': 'application/json',
    //                         'Access-Control-Allow-Origin': '*',
    //                     },
    //                     body: JSON.stringify({ username:email, password }),
    //                 });

    //                 const data = await response.json();

    //                 if (response.ok) {
    //                   console.log('login',data);
    //                   localStorage.setItem("userData", JSON.stringify(data));

    //                   navigate('/dashboard');
    //                         // Login Success: Show the success card
                        
    //                 } else {
    //                     // API returned an error status (400, 401, 409, 500 etc.)
    //                 }

    //             }
    //             catch (error){

    //             }
    const url = `https://devserver-main--umsbackend.netlify.app/api/v1/login`;

try {
  const response = await axios.post(url, {
    username: email,
    password: password
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'

    }
  });

  console.log('Login success:', response.data);
} catch (error) {
  console.error('Login error:', error);
}

    // 2. Mock Authentication (Replace with actual API call)
    console.log('Attempting login:', { email, password });
    
    // Simulate successful login and redirect to the dashboard
     
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-teal-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        
        <div className="text-center mb-8">
          {/* Placeholder for University Logo */}
          <h1 className="text-3xl font-bold text-teal-700">UMS Portal</h1>
          <p className="text-gray-500 mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
            <div className="relative">
              <RiMailLine className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <RiLockPasswordLine className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>
          
          <div className="flex justify-end text-sm">
            <a href="/forgot-password" className="text-teal-600 hover:text-teal-800">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-colors"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
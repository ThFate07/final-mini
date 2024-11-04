"use client";

import React, { use, useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { useAuth } from "../hooks/AuthContext.js";



const Login = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError , setLoginError] = useState('')
  const [rememberMe, setRememberMe] = useState(false);



  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      console.log('logged in succesfully')
      router.push('/app')
    } catch (error) { 
      console.log("error", error)
      setLoginError("failed to login");

    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-700">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        {/* Yellow bar to resemble the top bar */}
        <div className="bg-yellow-400 py-3 rounded-t-lg">
          <h2 className=" text-2xl font-semibold text-center text-gray-300" >Client Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-300 mb-2">Email</label>
            <input 
              type="text" 
              id="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-3 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-3 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your password"
            />
            <p className="mt-1 text-gray-500" >Already have an account? <Link className='underline text-gray-500' href={'/signup'}>Signup</Link></p>
            <p className='text-red-500'>{loginError}</p>
          </div>
          <div className="flex items-center mb-6">
            <input 
              type="checkbox" 
              id="rememberMe" 
              checked={rememberMe} 
              onChange={(e) => setRememberMe(e.target.checked)} 
              className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 bg-gray-600 border-none rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 text-gray-300">Remember me</label>
          </div>
          <button 
            type="submit" 
            className="w-full p-3 rounded-md bg-gray-300 text-gray-900 font-semibold hover:bg-gray-400 transition-colors"
          >
            Login
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
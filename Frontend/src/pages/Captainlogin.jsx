/**
 * Captainlogin.jsx
 * 
 * This React component handles the login functionality for a captain (driver).
 * 
 * Features:
 * - Renders a login form with email and password inputs.
 * - Authenticates captain credentials via POST request using Axios.
 * - Stores the JWT token and captain data in localStorage on successful login.
 * - Updates context state using CaptainDataContext.
 * - Redirects to the captain dashboard (/captain-home) upon successful login.
 * - Displays a styled UI with branding and navigation links.
 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CapatainContext'

const Captainlogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()



  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);
      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('captainToken', data.token);
        navigate('/captain-home');
        localStorage.setItem('captainStatus', 'open');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('Login failed. Please check your email and password.');
    }

    setEmail('')
    setPassword('')
  }
  return (
    <div>
      <nav class="bg-black border-gray-200 dark:bg-black-900 mt-0 pt-0 w-full h-12 ">
        <div class="w-full flex flex-wrap items-center justify-between mx-auto pt-2 ">
          <a href="https://uber.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="data:image/png;base64,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" class="h-8" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Uber</span>
          </a>
          <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div class="hidden w-full mr-6 md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg bg-black md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-black dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="#" class="block py-2 px-3 text-white rounded-sm md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" class="block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
              </li>
              <li>
                <a href="#" class="block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
              </li>
              <li>
                <a href="#" class="block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
              </li>
              <li>
                <a href="#" class="block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='flex'>
        <div className='LeftContainer flex justify-center items-center'>
          <div className='mt-6 ml-0 mr-16 w-2/4 h-64 '>
            <img src="https://img.freepik.com/premium-photo/funny-illustrated-mechanic-man-car_183364-50058.jpg?w=900" alt="" />
          </div>
        </div>
        <div className='transition-transform duration-300 transform hover:scale-105 p-7 ml-5 mt-10 h-[600px] w-1/2 shadow-2xl shadow-gray-800 border-4 border-gray-600 rounded-xl flex flex-col justify-between relative left-[-100px]'>
        <div>
            <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

            <form onSubmit={submitHandler}>
              <h3 className='text-lg font-medium mb-2'>What's your email</h3>
              <input
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                type="email"
                placeholder='email@example.com'
              />

              <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

              <input
                className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                required type="password"
                placeholder='password'
              />

              <button
                className='hover:bg-gray-400 bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
              >Login</button>

            </form>
            <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
          </div>
          <div>
            <Link
              to='/login'
              className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            >Sign in as User</Link>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Captainlogin
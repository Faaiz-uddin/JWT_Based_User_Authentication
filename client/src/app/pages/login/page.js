'use client';
import {React,  useState } from 'react';
import axios from 'axios';
import {  message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { setCookie } from 'nookies'; // Import setCookie from nookies
function login() {
 
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const router = useRouter();
  const [error, setError] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const success = (customMessage) => {
    messageApi.open({
      type: 'success',
      content: customMessage, // Use the custom message from the server
      duration: 3, // You can adjust the duration as needed
    });
  };
  const warning = (customMessage) => {
    messageApi.open({
      type: 'warning',
      content: customMessage,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //console.log(formData);
      // Client-side validation
      if (!formData.email || !formData.password) {
        setError('All fields are required.');
        return;
      }
      // Server-side validation
      const response = await axios.post('http://localhost:4000/api/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log(response.status);
      
      if (response.status === 200) {
         

        // Successful registration, reset the form
        setFormData({
          email:'',
          password:''
        });
        // console.log(response);
        // console.log("Cokkies here:"+response.data.token);
        
        setError(null);
        // Successful login, set the token cookie
        setCookie(null, 'token', response.data.token, {
          maxAge: 30 * 24 * 60 * 60, // Set the cookie to expire in 30 days
          path: '/',
        });
       // console.log(response.data.token);
        success(response.data.message);
        //console.log(router);
        
        router.push('/');
        

        // router.push('/pages/signup');
       
      } else if(response.status === 201){
        warning(response.data.message);
      }else {
        // Handle server-side validation errors
        setError(response.data.error);
        console.log(response);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred while submitting the form.');
    }
  }
  return (
    <div>
      
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6"  method="POST" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
            {contextHolder}
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already Have an Account?{' '}
            <Link href="/pages/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign Up
            </Link>
          </p>
          
        </div>
      </div>
    </div>
  )
}

export default login

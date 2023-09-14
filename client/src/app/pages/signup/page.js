'use client';
import {React,  useState } from 'react';
import axios from 'axios';
import {  message } from 'antd';
import Link from 'next/link';
function signup() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });
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
      
      // Client-side validation
      if (!formData.firstname || !formData.lastname || !formData.email || !formData.password) {
        setError('All fields are required.');
        return;
      }
      // Server-side validation
      const response = await axios.post('http://localhost:4000/api/registration', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log(response.status);
      
      if (response.status === 201) {
        // Successful registration, reset the form
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          password: '',
        });
        setError(null);
        //console.log(response.data.message);
        success(response.data.message);
       
      } else if(response.status === 200){
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
  };
  return (
    <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6"  method="POST" onSubmit={handleSubmit}>
          <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6  text-gray-900">
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  required
                  value={formData.firstname}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 p-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {/* {errors.firstname && <p className="text-red-500">{errors.firstname}</p>} */}
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Last Name
              </label>
              <div className="mt-2">
                <input
                   id="lastname"
                   name="lastname"
                   type="text"
                   required
                   value={formData.lastname}
                   onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 p-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email 
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 p-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a> */}
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 p-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
            {contextHolder}
              <button
                type="submit"
              
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already Have an Account?{' '}
            <Link href="/pages/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign In
            </Link>
           
          </p>
        </div>
      </div>
        
    </div>
  )
}

export default signup

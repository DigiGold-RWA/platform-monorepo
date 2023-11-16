'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SocialLogin from './FormComponents/SocialLogin';
import { LoaderIcon } from '../IconComponent';
import { signIn } from 'next-auth/react';
import { getCsrfToken } from 'next-auth/react';
import axios from 'axios';

const LoginForm = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email'));
  const [password, setPassword] = useState('');
  const newCustomer = searchParams.get('new');

  const [error, setError] = useState(null);
  const [errMessage, setErrMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { push } = useRouter();

  const loginUser = async (e) => {
    setLoading(true);
    e.preventDefault();

    const signInResponse = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      push('/dashboard');
    } else {
      console.log('Error: ', signInResponse);
      setError(true);
      setErrMessage('Email or password is incorrect');
      setLoading(false);
    }
  };

  return (
    <>
      {newCustomer && !error ? (
        <div
          className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div className="flex">
            <div>
              <p className="font-bold">Account was successdully created</p>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5"
          role="alert"
        >
          <strong className="font-bold">
            There was an error in your submission
          </strong>
          {errMessage && (
            <ul className="text-sm list-disc ml-5">
              <li>{errMessage}</li>
            </ul>
          )}
        </div>
      )}
      <form action="#" className="mt-5" onSubmit={loginUser}>
        <div className="flex flex-col gap-6">
          <div>
            <input
              id="email"
              type="email"
              required
              className="block w-full h-12 px-4 py-2 mt-2 text-white bg-[#363636] border-0 focus:border-none rounded-lg focus:outline-none focus:ring-none"
              name="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              min="3"
              autoComplete="off"
              placeholder="Email address"
            />
          </div>

          <div className="flex w-full mb-2">
            {loading ? (
              <a className="disabled cursor-not-allowed h-[50px] py-2 px-4 w-full opacity-50 cursor-no-drop  bg-[#FFCC29]  hover:bg-[#FFCC29]/90  focus:ring-offset-none text-[#484848] transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-none rounded-lg flex items-center justify-center ">
                <LoaderIcon className="animate-spin mr-1" /> Processing
              </a>
            ) : (
              <button
                type="submit"
                className="h-[50px] py-2 px-4 w-full bg-[#FFCC29]  hover:bg-[#FFCC29]/90 focus:ring-purple-500 focus:ring-offset-none text-[#484848] transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-none rounded-lg flex items-center justify-center "
              >
                Log in
              </button>
            )}
          </div>

          <div className="flex items-center before:flex-1 before:border-t before:border-[#525151] before:mt-0.5 after:flex-1 after:border-t after:border-[#525151] after:mt-0.5">
            <p className="text-center text-white text-xs mx-4 mb-0">OR</p>
          </div>

          <div className="flex items-center justify-between my-2 gap-3 flex-wrap">
            <SocialLogin />
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;

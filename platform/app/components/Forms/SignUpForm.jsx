'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, redirect } from 'next/navigation';
import SocialLogin from './FormComponents/SocialLogin';
import { LoaderIcon } from '../IconComponent';
import axios from 'axios';

const SignUpForm = () => {
  const [error, setError] = useState(null);
  const [errMessage, setErrMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const password = React.useRef(null);
  const email = React.useRef(null);

  const { push } = useRouter();

  const hostUrl = process.env.NEXT_PUBLIC_AUTH_URL;

  console.log('hostUrl', hostUrl);

  const createAccount = async (e) => {
    setLoading(true);
    e.preventDefault();

    const data = {
      email: email.current.value,
      password: password.current.value,
    };

    axios
      .post(`${hostUrl}/api/customer/register`, data)
      .then((res) => {
        if (res.data.status == 200) {
          push(`${hostUrl}/auth/login?email=${email.current.value}&new=true`);
        } else {
          setError(true);
          setErrMessage(res.data?.data?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log('err', err);
        setError(true);
        setErrMessage(err.message);
        setLoading(false);
      });
  };

  return (
    <>
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
      <form action="#" onSubmit={createAccount}>
        <div className="flex flex-col mb-2 gap-6">
          <div>
            {/* <label className="text-gray-700 font-bolder mb-3" htmlFor="email">
              Email address
            </label> */}
            <input
              id="email"
              type="email"
              required
              ref={email}
              className="block w-full h-12 px-4 py-2 mt-2 text-white bg-[#363636] border-0 focus:border-none rounded-lg focus:outline-none focus:ring-none"
              name="email"
              autoComplete="off"
              placeholder="Email address"
            />
          </div>
          {/* <div className=" text-sm relative border mb-0 shadow appearance-none label-floating">
            <input
              className=" w-full py-3 px-3 pt-2 focus:pt-1 text-gray-800 leading-normal "
              id="email2"
              type="email"
              placeholder="Your Email Address"
            />
            <label
              className="absolute block text-gray-800 top-0 left-0 w-full px-3 py-3 pt-2 focus:pt-2 leading-normal"
              htmlFor="email2"
            >
              Your Email Address
            </label>
          </div> */}

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
                Sign Up
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

export default SignUpForm;

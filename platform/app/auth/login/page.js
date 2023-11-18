import LoginForm from '@/app/components/Forms/LoginForm';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Login = () => {
  return (
    <>
      <div
        className=" px-3 py-3 bx-shadow sm:px-6 max-w-[500px] mx-auto rounded-3xl"
        style={{
          background: 'rgba(40, 40, 39, 0.45)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="py-6 px-4 md:px-6 login--bx ">
          <div className="self-center mb-2 text-xl lg:text-4xl flex items-center justify-center w-full">
            <Image
              src="/Logo/logo_main.svg"
              width={50}
              height={50}
              alt="regsitration"
            />
          </div>
          <div className="mb-8 text-center space-y-2">
            <h1 className="text-2xl capitalize font-bold text-white">
              Welcome back
            </h1>
            <p className="text-sm text-white">
              Don&apos;t have an account?{' '}
              <Link href={'/auth/signup'} className="text-[#FFCC29]">
                Sign up
              </Link>
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Login;

'use client';
import React, { useContext } from 'react';
import { DashboardMenuContext } from '../utils/dashboardContext';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import classNames from 'classnames';
import { RecordCircle, Profile, Global } from 'iconsax-react';
import Image from 'next/image';
import { Category } from 'react-iconly';
import { LogoutIcon } from './IconComponent';
import { signOut } from 'next-auth/react';
import { menuLinks } from '../lib/constants';
// import '../navbar.css';

const Navbar = () => {
  const contextValue = useContext(DashboardMenuContext) || {};
  const { toggleDashMenu, showDashMenu } = contextValue;
  const pathname = usePathname();

  return (
    <>
      <header className="bg-[#1B1B1B] border-b border-[#463a3a] z-10">
        <div className="container mx-auto px-4 lg:px-0">
          <nav className="flex items-center justify-between flex-wrap py-4 ">
            <div className="flex items-start justify-start flex-shrink-0 text-white mr-6">
              <Link
                href="/"
                className="text-xl  font-semibold font-heading"
              >
                <Image
                  src="/Logo/logo_main.svg"
                  alt="logo"
                  width={50}
                  height={100}
                />
              </Link>
            </div>
            <div className="block lg:hidden">
              <div className="flex gap-5">
                <button className="flex items-center  px-3 py-2 border rounded text-[#45CD85] border-[#45CD85] ">
                  <svg
                    className="fill-current h-3 w-3"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-full hidden  flex-grow lg:flex lg:items-center lg:w-auto ">
              <div className="text-sm lg:flex-grow flex-row gap-6 flex ">
                {menuLinks.map((menuItem) => (
                  <Link
                    key={menuItem.label}
                    href={`${menuItem.href}`}
                    className={`menu-item font-thin ${
                      pathname == menuItem.href ||
                      pathname.startsWith(`${menuItem.href}/`)
                        ? 'bg-[#FFCC29] text-[#1B1B1B] border-[#FFCC29]'
                        : 'text-white border-transparent'
                    }   items-center py-2 px-4  transition-colors duration-200 ease-in hover:bg-[#FFCC29] hover:text-[#1B1B1B] justify-start text-sm hover:border-[#008080]`}
                  >
                    <span className={classNames('mx-2 text-sm font-normal ')}>
                      {menuItem.label}
                    </span>
                  </Link>
                ))}

                {/* <Link
                  href="/"
                  className={`block mt-4 lg:inline-block lg:mt-0 text-[#5B5B5B]  hover:bg-gray-300 px-3 py-3 mr-4 rounded-md transition-all duration-200 ease-in-out ${
                    router.asPath === '/' && 'bg-gray-300'
                  }`}
                >
                  Dashboard
                </Link> */}
              </div>
              <div className="lg:flex lg:items-center lg:w-auto">
                <div className="flex items-center">
                  <Global color='#ffffff' size={22}/>
                  <select
                    defaultValue={0}
                    className="px-1 py-2 rounded-[4px] focus-visible:outline-none focus-within:outline-none focus:outline-none text-sm bg-transparent text-white bg-gray-100"
                  >
                    <option value={0}>English</option>
                    <option value={1}>Français</option>
                    <option value={2}>繁體中文</option>
                    <option value={3}>한국어</option>
                    <option value={4}>日本語</option>
                    <option value={5}>Español</option>
                  </select>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;

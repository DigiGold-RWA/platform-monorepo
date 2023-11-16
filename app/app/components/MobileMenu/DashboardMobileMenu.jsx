'use client';

import React, { useState, useEffect, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import classNames from 'classnames';
import { RecordCircle, Profile } from 'iconsax-react';
import Image from 'next/image';
import { Category } from 'react-iconly';
import { LogoutIcon } from '../IconComponent';
import { signOut } from 'next-auth/react';
import { DashboardMenuContext } from '@/app/utils/dashboardContext';

const DashboardMobileMenu = () => {
  const { toggleDashMenu, showDashMenu } =
    useContext(DashboardMenuContext) || {};

  const pathname = usePathname();

  const wrapperClasses = classNames(
    'h-full dashboardsidebar pb-4 bg-white fixed lg:hidden justify-between shadow-sm scrollbar-change flex-col overflow-y-auto overflow-x-hidden border-r border-[#EDEFF3] w-80 transition duration-300 ease-in-out',
    {
      'block open': showDashMenu,
    //   '-left-[400px] transition duration-300 ease-in-out': !showDashMenu,
    }
  );

  const menuLinks = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: <Category size={16} />,
    },
    {
      label: 'My Portfolio',
      href: '/my-portfolio',
      icon: <RecordCircle size={16} />,
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: <Profile size={16} />,
    },
    {
      label: 'Sign Out',
      href: '/signout',
      action: (e) => {
        e.preventDefault();
        signOut();
      },
      icon: <LogoutIcon size={16} />,
    },
  ];

  return (
    <>
      <div
        className={wrapperClasses}
        style={{
          transition: 'left 1s ease',

        }}
      >
        <div className="flex flex-col">
          <div className="px-4">
            <div className="flex items-center justify-center py-3 border-b  border-[#8D8E8E]  relative h-16 ">
              <div className="px-3 w-full block h-full ">
                <Link
                  href={'/dashboard'}
                  className="flex items-center w-full justify-center h-full"
                >
                  <Image
                    src="/Logo/logo_dash.png"
                    height={90}
                    width={90}
                    className="transition 300ms ease object-contain w-auto h-auto mr-2"
                    priority
                    alt="logo dash"
                  />
                  {/* <Logo className="transition 300ms ease" /> */}
                </Link>
              </div>
            </div>
          </div>

          <nav className="mt-6 md:mt-3 grow pl-4">
            <div className=" flex-wrap pl-4">
              {menuLinks.map((menuItem) => (
                <Link
                  key={menuItem.label}
                  href={`${menuItem.href}`}
                  onClick={menuItem.action}
                  className={`menu-item w-full font-thin ${
                    pathname == menuItem.href ||
                    pathname.startsWith(`${menuItem.href}/`)
                      ? 'bg-[#EAFCFC] text-[#008080] border-r-4 border-[#008080]'
                      : 'text-[#737070] border-r-4 border-transparent'
                  }  flex items-center py-3 px-5  my-2 transition-colors duration-200 ease-in hover:bg-[#EAFCFC] hover:text-[#008080] justify-start text-sm hover:border-[#008080]`}
                >
                  <span className="text-left px-3">{menuItem.icon}</span>
                  <span className={classNames('mx-2 text-sm font-normal ')}>
                    {menuItem.label}
                  </span>
                </Link>
              ))}
              {/* <button
                  className={`menu-item w-full font-thin text-[#737070] flex items-center py-3 px-5  my-2 transition-colors duration-200 ease-in hover:bg-[#EAFCFC] hover:text-[#008080] justify-start text-sm hover:border-[#008080]`}
                >
                  <span className="text-left px-3">ic</span>
                  <span className={classNames('mx-2 text-sm font-normal ')}>
                    Sign Out
                  </span>
                </button> */}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default DashboardMobileMenu;

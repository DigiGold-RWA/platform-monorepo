'use client';

import React, { useState, useEffect, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import classNames from 'classnames';
import { RecordCircle, Profile } from 'iconsax-react';
import Image from 'next/image';
import { Category } from 'react-iconly';
import { LogoutIcon } from '../IconComponent';
// import { signOut } from 'next-auth/react';
import { DashboardMenuContext } from '@/app/utils/dashboardContext';
import { menuLinks } from '@/app/lib/constants';

const DashboardMobileMenu = () => {
  const { toggleDashMenu, showDashMenu } =
    useContext(DashboardMenuContext) || {};

  const pathname = usePathname();

  const wrapperClasses = classNames(
    'h-full dashboardsidebar pb-4 bg-[#1b1b1b] fixed lg:hidden justify-between shadow-sm scrollbar-change flex-col overflow-y-auto overflow-x-hidden border-r border-[#373636] w-80 transition duration-300 ease-in-out z-50',
    {
      'block open': showDashMenu,
    //   '-left-[400px] transition duration-300 ease-in-out': !showDashMenu,
    }
  );

  return (
    <>
      <div
        className={wrapperClasses}
        style={{
          transition: 'left 1s ease',

        }}
      >
        <div className="flex flex-col ">
          <div className="px-4">
            <div className="flex items-center justify-center py-3 border-b  border-[#373636]  relative h-16 ">
              <div className="px-3 w-full block h-full ">
                <Link
                  href={'/dashboard'}
                  className="flex items-center w-full justify-start h-full"
                >
                  <Image
                    src="/Logo/logo_main.svg"
                    height={40}
                    width={40}
                    className="transition 300ms ease object-contain w-auto h-auto mr-2"
                    priority
                    alt="logo dash"
                  />
                  {/* <Logo className="transition 300ms ease" /> */}
                </Link>
              </div>
            </div>
          </div>

          <nav className="mt-6 md:mt-3 grow ">
            <div className=" flex-wrap ">
              {menuLinks.map((menuItem) => (
                <Link
                  key={menuItem.label}
                  href={`${menuItem.href}`}
                  onClick={menuItem.action}
                  className={`menu-item w-full font-thin ${
                    pathname == menuItem.href ||
                    pathname.startsWith(`${menuItem.href}/`)
                      ? 'bg-[#7B6941] text-white '
                      : 'text-white  border-transparent'
                  }  flex items-center py-3 px-5  my-2 transition-colors duration-200 ease-in hover:bg-[#7B6941] hover:text-white justify-start text-sm `}
                >
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

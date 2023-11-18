'use client';
import React, { useState, useEffect, useRef, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../../navbar.css';
import { ArrowDown, ArrowDown2, Global } from 'iconsax-react';
import { MenuContext } from '@/app/utils/context';

const Navbar = () => {
  const { toggle, showMenu } = useContext(MenuContext) || {};

  return (
    <>
      <header className=" z-50" style={{ position: 'relative' }}>
        <div className="container mx-auto px-4">
          <nav className="flex  flex-wrap items-center justify-between py-4">
            <div className="lg:order-1 w-auto lg:w-1/4 lg:text-center">
              <Link href="/" className="text-xl  font-semibold font-heading">
                <Image
                  src="/Logo/logo_main.svg"
                  width={60}
                  height={150}
                  alt="logo"
                  priority
                  className=""
                />
              </Link>
            </div>
            <div className="lg:hidden">
              <button
                className={`navbar-burger flex items-center py-2 px-3 text-[#11161F]  rounded relative transition-all duration-150 ease-linear ${
                  showMenu ? 'open' : ''
                }`}
                id="nav-icon3"
                onClick={toggle}
              >
                {/* <div id="nav-icon3"> */}
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {/* </div> */}
              </button>
              <nav
                id="mobile-nav"
                className={`absolute top-full z-20 left-0 w-full px-4 overflow-hidden transition-all duration-300 ease-in-out  shadow-lg mainNav bg-[#1b1b1b] border-b border-[#373636]  ${
                  showMenu ? 'show' : ''
                }`}
              >
                <ul className=" py-4 bg-[#1b1b1b]">
                  <li>
                    <Link
                      className="flex text-white hover:bg-card-background  py-2 px-2 rounded-[4px]"
                      href="/"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex text-white hover:bg-card-background  py-2 px-2 rounded-[4px]"
                      href="/report"
                    >
                      Audit & Compliance
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex text-white hover:bg-card-background py-2 px-2 rounded-[4px]"
                      href=""
                    >
                      Docs
                    </Link>
                  </li>
                  <li>
                    <div className="">
                      <select
                        defaultValue={0}
                        className="px-1 py-2 rounded-[4px] focus-visible:outline-none focus-within:outline-none focus:outline-none text-sm  bg-[#1b1b1b] text-white w-full"
                      >
                        <option value={0}>English</option>
                        <option value={1}>Français</option>
                        <option value={2}>繁體中文</option>
                        <option value={3}>한국어</option>
                        <option value={4}>日本語</option>
                        <option value={5}>Español</option>
                      </select>
                    </div>
                  </li>
                  <li>
                    <Link
                      className=" mt-4 lg:mt-0 text-[#484848]  bg-[#FFCC29] rounded-lg px-6 py-2 transition duration-300 ease text-sm text-center h-12 flex items-center justify-center "
                      href="/auth/login"
                    >
                      Open App
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="hidden lg:order-2 lg:block w-full lg:w-auto lg:text-center">
              <div className="navbar-menu flex items-center justify-end gap-4  ">
                <Link
                  href={'/contact'}
                  className="block lg:inline-block mt-4 lg:mt-0  text-white px-5 relative"
                >
                  Contact
                </Link>
                <div className="block lg:inline-block mt-4 lg:mt-0 text-white px-5 menu relative cursor-default">
                  <span className="items-center flex justify-between gap-2">
                    Audit & Compliance <ArrowDown2 size={12} />
                  </span>
                  <div className="menu-dropdown">
                    <ul className="space-y-3 text-left text-white text-base">
                      <li>
                        <Link href={'/report'}>Policies & Procedures</Link>
                      </li>
                      <li className="flex items-center justify-between">
                        <Link href={'/'}>Incorporation</Link>
                      </li>
                      <li className="flex items-center justify-between">
                        <Link href={'/'}>Reserve Audit</Link>
                      </li>
                      <li className="flex items-center justify-between">
                        <Link href={'/'}>Smart Contract Audit</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="block lg:inline-block mt-4 lg:mt-0  text-white px-5 menu relative cursor-default ">
                  <span className="items-center flex justify-between gap-2">
                    Docs <ArrowDown2 variant="Linear" size={12} />
                  </span>

                  <div className="menu-dropdown">
                    <ul className="space-y-3 text-left text-white text-base">
                      <li>
                        <Link href={'/#how-it-works'}>Overview</Link>
                      </li>
                      <li className="flex items-center justify-between">
                        <Link href={'/'}>FAQs</Link>
                      </li>
                      <li className="flex items-center justify-between">
                        <Link href={'/'}>How it works</Link>
                      </li>
                      <li className="flex items-center justify-between">
                        <Link href={'/'}>$DGold token</Link>
                      </li>
                      <li className="flex items-center justify-between">
                        <Link href={'/'}>Fees structure</Link>
                      </li>
                      <li className="flex items-center justify-between">
                        <Link href={'/'}>Whitespace</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <Link
                  className="block lg:inline-block mt-4 lg:mt-0 text-[#484848]  bg-[#FFCC29] rounded-lg px-6 py-2 transition duration-300 ease text-sm"
                  href="/auth/login"
                >
                  Open App
                </Link>
                <div
                  href="/"
                  className="block lg:inline-block mt-4 lg:mt-0  text-white px-5 "
                >
                  <div className="flex items-center">
                    <Global size={24} />
                    <div>
                      <select
                        defaultValue={0}
                        className="px-1 py-1 rounded-lg focus-visible:outline-none focus-within:outline-none focus:outline-none text-sm bg-[#1b1b1b]"
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
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;

"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../navbar.css";
import { ArrowDown, ArrowDown2, Global } from "iconsax-react";
import { MenuContext } from "@/app/utils/context";

const Navbar = () => {
    const { toggle, showMenu } = useContext(MenuContext) || {};

    return (
        <>
            <header
                className="shadow-header  shadow-slate-300 shadow-sm z-50"
                style={{ position: "relative" }}
            >
                <div className="container mx-auto px-4">
                    <nav className="flex  flex-wrap items-center justify-between py-4">
                        <div className="lg:order-1 w-auto lg:w-1/4 lg:text-center">
                            <Link
                                href="/"
                                className="text-xl text-gray-800 font-semibold font-heading"
                            >
                                <Image
                                    src="/Logo/home_logo.svg"
                                    width={150}
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
                                    showMenu ? "open" : ""
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
                                className={`absolute top-full z-20 left-0 w-full px-4 overflow-hidden transition-all duration-300 ease-in-out  shadow-lg ring-1 ring-gray-900/5 bg-[#008080] mainNav ${
                                    showMenu ? "show" : ""
                                }`}
                            >
                                <ul className="bg-[#008080] py-4">
                                    <li>
                                        <Link
                                            className="flex text-white hover:bg-gray-800/10 py-2 px-2 rounded-[4px]"
                                            href="/reserve-audit"
                                        >
                                            Audit & Compliance
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="flex text-white hover:bg-gray-800/10 py-2 px-2 rounded-[4px]"
                                            href="https://digicask.gitbook.io/digicask-docs/"
                                            target="_blank"
                                        >
                                            Docs
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="">
                                            <select
                                                defaultValue={0}
                                                className="px-1 py-2 rounded-[4px] focus-visible:outline-none focus-within:outline-none focus:outline-none text-sm bg-transparent bg-gray-100"
                                            >
                                                <option value={0}>
                                                    English
                                                </option>
                                                <option value={1}>
                                                    Français
                                                </option>
                                                <option value={2}>
                                                    繁體中文
                                                </option>
                                                <option value={3}>
                                                    한국어
                                                </option>
                                                <option value={4}>
                                                    日本語
                                                </option>
                                                <option value={5}>
                                                    Español
                                                </option>
                                            </select>
                                        </div>
                                    </li>
                                    <li>
                                        <Link
                                            className="flex text-white hover:bg-gray-800/10 px-2 py-2 rounded-[4px]"
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
                                <div className="block lg:inline-block mt-4 lg:mt-0 text-[#11161F] px-5 menu relative cursor-default">
                                    <span className="items-center flex justify-between gap-2">
                                        Audit & Compliance{" "}
                                        <ArrowDown2 size={12} />
                                    </span>
                                    <div className="menu-dropdown">
                                        <ul className="space-y-3 text-left text-[#344054] text-base">
                                            <li>
                                                <Link href={"/reserve-audit"}>
                                                    Reserve report
                                                </Link>
                                            </li>
                                            <li className="flex items-center justify-between">
                                                <Link href={"/reserve-audit"}>
                                                    Audit report
                                                </Link>
                                            </li>
                                            <li className="flex items-center justify-between">
                                                <Link
                                                    href={
                                                        "https://github.com/DigiCask/platform-monorepo/blob/main/CODE_AUDIT.md"
                                                    }
                                                    target="_blank"
                                                >
                                                    Code Audit
                                                </Link>
                                            </li>
                                            <li className="flex items-center justify-between">
                                                <Link
                                                    href={
                                                        "https://digicask.gitbook.io/digicask-docs/how-whisky-investing-works"
                                                    }
                                                    target="_blank"
                                                >
                                                    Why Whisky Investment ?
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="block lg:inline-block mt-4 lg:mt-0 text-[#11161F] px-5 menu relative cursor-default ">
                                    <span className="items-center flex justify-between gap-2">
                                        Docs{" "}
                                        <ArrowDown2
                                            variant="Linear"
                                            size={12}
                                        />
                                    </span>

                                    <div className="menu-dropdown">
                                        <ul className="space-y-3 text-left text-[#344054] text-base">
                                            <li>
                                                <Link href={"/#how-it-works"}>
                                                    How it works
                                                </Link>
                                            </li>
                                            <li className="flex items-center justify-between">
                                                <Link
                                                    href={
                                                        "https://digicask.gitbook.io/digicask-docs/faqs"
                                                    }
                                                    target="_blank"
                                                >
                                                    FAQs
                                                </Link>
                                            </li>
                                            <li className="flex items-center justify-between">
                                                <Link
                                                    href={
                                                        "/digicask-whitepaper-v1.01.pdf"
                                                    }
                                                    target="_blank"
                                                >
                                                    Whitepaper
                                                </Link>
                                            </li>
                                            <li className="flex items-center justify-between">
                                                <Link
                                                    href={
                                                        "https://digicask.gitbook.io/digicask-docs/fees-structure"
                                                    }
                                                    target="_blank"
                                                >
                                                    Fees structure
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div
                                    href="/"
                                    className="block lg:inline-block mt-4 lg:mt-0 text-[#11161F] px-5 "
                                >
                                    <div className="flex items-center">
                                        <Global size={24} />
                                        <div>
                                            <select
                                                defaultValue={0}
                                                className="px-1 py-1 rounded-lg focus-visible:outline-none focus-within:outline-none focus:outline-none text-sm bg-transparent "
                                            >
                                                <option value={0}>
                                                    English
                                                </option>
                                                <option value={1}>
                                                    Français
                                                </option>
                                                <option value={2}>
                                                    繁體中文
                                                </option>
                                                <option value={3}>
                                                    한국어
                                                </option>
                                                <option value={4}>
                                                    日本語
                                                </option>
                                                <option value={5}>
                                                    Español
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    className="block lg:inline-block mt-4 lg:mt-0 text-white hover:text-[#008080] hover:bg-white  hover:border-[#008080] hover:border  border border-[#008080] bg-[#008080] rounded-full px-6 py-2 transition duration-300 ease text-sm"
                                    href="/auth/login"
                                >
                                    Open App
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Navbar;

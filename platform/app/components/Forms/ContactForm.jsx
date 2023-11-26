"use client";
import React, { useState } from "react";
import { LoaderIcon } from "../IconComponent";
import { Help } from "@/app/lib/constants";

const ContactForm = () => {
    const [loading, setLoading] = useState(false);

    return (
        <form action="#">
            <div className="flex flex-col mb-2 gap-6">
                <div className="flex items-center justify-between gap-2">
                    <div className="w-full md:w-1/2">
                        <input
                            id="fname"
                            type="text"
                            required
                            className="block w-full h-14 px-4 py-2 mt-2 text-white bg-[#363636] border-0 focus:border-none rounded-lg focus:outline-none focus:ring-none placeholder-white"
                            name="fname"
                            autoComplete="off"
                            placeholder="First name*"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <input
                            id="lname"
                            type="text"
                            required
                            className="block w-full h-14 px-4 py-2 mt-2 text-white bg-[#363636] border-0 focus:border-none rounded-lg focus:outline-none focus:ring-none placeholder-white"
                            name="lname"
                            autoComplete="off"
                            placeholder="Last name*"
                        />
                    </div>
                </div>

                <div>
                    <input
                        id="email"
                        type="email"
                        required
                        className="block w-full h-14 px-4 py-2 mt-2 text-white bg-[#363636] border-0 focus:border-none rounded-lg focus:outline-none focus:ring-none  placeholder-white"
                        name="email"
                        autoComplete="off"
                        placeholder="Email address*"
                    />
                </div>
                {/* <div>
                    <input
                        id="job"
                        type="text"
                        required
                        className="block w-full h-14 px-4 py-2 mt-2 text-white bg-[#363636] border-0 focus:border-none rounded-lg focus:outline-none focus:ring-none  placeholder-white"
                        name="job"
                        autoComplete="off"
                        placeholder="Job Title*"
                    />
                </div> */}
                <div>
                    <input
                        id="company"
                        type="text"
                        required
                        className="block w-full h-14 px-4 py-2 mt-2 text-white bg-[#363636] border-0 focus:border-none rounded-lg focus:outline-none focus:ring-none  placeholder-white"
                        name="company"
                        autoComplete="off"
                        placeholder="Company name*"
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Description"
                        className="block w-full h-[150px] px-4 py-2 mt-2 text-white bg-[#363636] border-0 focus:border-none rounded-lg focus:outline-none focus:ring-none  placeholder-white"
                    ></textarea>
                    {/* <select
                        id="what_you_want"
                        className="block w-full h-14 px-4 py-2 mt-2 text-white bg-[#363636] border-0 focus:border-none rounded-lg focus:outline-none focus:ring-none  placeholder-white"
                        name="what_you_want"
                        defaultValue={0}
                    >
                        <option value={0}>I want Digigold to help with*</option>
                        {Help.map((help, index) => (
                            <option value={help.value} key={index}>
                                {help.title}
                            </option>
                        ))}
                    </select> */}
                </div>

                <div className="flex items-start my-2">
                    <input
                        id="agree"
                        type="checkbox"
                        onChange={() => {
                            console.log("checked");
                        }}
                        className="w-4 h-4 mt-1 accent-[#FFCC29] bg-[#363636] border-[#363636] rounded-full focus:ring-none"
                    />
                    <label
                        htmlFor="agree"
                        className="ml-2 text-base text-white"
                    >
                        You agree to our friendly{" "}
                        <a href="" className="underline">
                            privacy policy.
                        </a>
                    </label>
                </div>

                <div className="flex w-full mb-2">
                    {loading ? (
                        <a className="disabled cursor-not-allowed h-[50px] py-2 px-4 w-full opacity-50 cursor-no-drop  bg-[#FFCC29]  hover:bg-[#FFCC29]/90  focus:ring-offset-none text-[#484848] transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-none rounded-lg flex items-center justify-center ">
                            <LoaderIcon className="animate-spin mr-1" />{" "}
                            Processing
                        </a>
                    ) : (
                        <button
                            type="submit"
                            className="h-[50px] py-2 px-4 w-full bg-[#FFCC29] hover:bg-[#FFCC29]/90 focus:ring-purple-500 focus:ring-offset-none text-[#484848] transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-none rounded-lg flex items-center justify-center "
                        >
                            Send message
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default ContactForm;

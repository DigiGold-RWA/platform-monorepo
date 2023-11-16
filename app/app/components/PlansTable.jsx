"use client";
import React, { useRef, useState, useEffect } from "react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Input,
    Button,
    Radio,
    RadioGroup,
} from "@chakra-ui/react";
import Image from "next/image";

const PlansTable = ({ plans, usdcBalance, dcaskBalance }) => {
    const [currentTier, setCurrentTier] = useState([]);
    const [selectedAPY, setSelectedAPY] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    return (
        <>
            <div>
                <div className="overflow-x-auto md:overflow-x-auto ">
                    <table className="min-w-full leading-normal table-auto overflow-x-auto relative order-table bg-white">
                        <thead className="bg-neutral50 font-normal">
                            <tr className="text-[#667085]">
                                <th
                                    scope="col"
                                    className="px-5 py-3  border-b border-gray-200   text-left text-sm uppercase whitespace-nowrap"
                                >
                                    Coin
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-3  border-b border-gray-200   text-left text-sm uppercase whitespace-nowrap"
                                >
                                    APY
                                </th>

                                <th
                                    scope="col"
                                    className="px-5 py-3 border-b border-gray-200   text-left text-sm uppercase whitespace-nowrap w-1/2"
                                >
                                    Tiers
                                </th>

                                <th
                                    scope="col"
                                    className="px-5 py-3 border-b border-gray-200  text-left text-sm uppercase whitespace-nowrap"
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td className="px-5 py-5 text-sm whitespace-nowrap">
                                    <div className="flex items-center justify-start gap-1">
                                        <div>
                                            <Image
                                                src="/Logo/logo_sm.png"
                                                alt="logo"
                                                width={25}
                                                height={25}
                                            />
                                        </div>
                                        <span className=" text-base block ">
                                            $DCASK
                                        </span>
                                    </div>
                                </td>
                                <td className="px-5 py-5 text-sm whitespace-nowrap ">
                                    <p className="text-sm text-[#008080]">
                                        {selectedAPY}%
                                    </p>
                                </td>
                                <td className="px-5 py-5 whitespace-nowrap w-1/2">
                                    <div className="flex items-start justify-start flex-row gap-3 w-full">
                                    </div>
                                </td>
                                <td className="px-5 py-5 text-sm whitespace-nowrap">
                                    <button
                                        className=" bg-[#008080] px-6 py-3 rounded-md text-white"
                                        ref={btnRef}
                                        onClick={onOpen}
                                    >
                                        Purchase
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <PortfolioDrawer
                isOpen={isOpen}
                onClose={onClose}
                btnRef={btnRef}
                currentTier={currentTier}
                selectedAPY={selectedAPY}
                setSelectedAPY={setSelectedAPY}
                setCurrentTier={setCurrentTier}
                plans={plans}
                availableUsdc={usdcBalance}
                availableDask={dcaskBalance}
            /> */}
        </>
    );
};

export default PlansTable;

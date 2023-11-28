"use client";

import React, { useState } from "react";
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    useDisclosure,
    Button,
    Accordion,
    AccordionItem,
    AccordionButton,
    Box,
    AccordionIcon,
    AccordionPanel,
    useAccordionItem,
} from "@chakra-ui/react";
import { CardReceiveIcon, CopyIcon, MoneyReceiveIcon } from "../IconComponent";
import Image from "next/image";
import { MoneySend, Wallet } from "iconsax-react";

function WithdrawModal({ isOpen, onClose, user }) {
    const [option, setOption] = useState(null);

    return (
        <>
            <Modal onClose={onClose} size="xl" isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent bg="#282827" color="#fff">
                    <ModalHeader>Withdraw Funds</ModalHeader>
                    <ModalCloseButton
                        onClick={() => {
                            onClose;
                        }}
                    />
                    <ModalBody>
                        <div className="pt-5 pb-8 space-y-4">
                            <div className="mt-1 mb-4 relative rounded-lg flex-1  items-center grow flex w-full ">
                                <select
                                    className="block w-full h-14 px-4 py-2  text-white bg-[#363636] border-0 focus:border-none rounded-lg focus:outline-none focus:ring-none  placeholder-white"
                                    defaultValue={"klay"}
                                >
                                    <option value="klay">KLAY</option>
                                    <option value="dgold">DGOLD</option>
                                </select>
                            </div>

                            <div className=" relative rounded-lg flex-1 items-center grow flex h-14 w-full bg-[#363636]">
                                <input
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    className={`py-2 px-4 block h-14 w-full sm:text-sm text-white bg-[#363636] border-0 focus:border-none rounded-lg focus:outline-none focus:ring-none placeholder-text-white`}
                                    autoComplete="off"
                                />
                            </div>

                            <button className="text-white bg-[#FFCC29] h-12 flex items-center justify-center w-full rounded-lg cursor-pointer">
                                <MoneySend
                                    size="20"
                                    color="#484848"
                                    className="mr-2"
                                />
                                <span className="text-[#484848] font-semibold">
                                    Withdraw
                                </span>
                            </button>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default WithdrawModal;

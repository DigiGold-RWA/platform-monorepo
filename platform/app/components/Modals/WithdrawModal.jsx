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
import { ethers } from "ethers";

function WithdrawModal({
    isOpen,
    onClose,
    ethersSigner,
    particle,
    tokenIface,
    setTransactionHistory,
    transactionHistory,
    newTransaction,
}) {
    const [option, setOption] = useState("klay");
    const [amount, setAmount] = useState(1);
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");

    // const hostUrl = process.env.NEXT_PUBLIC_HOST_URL;
    // const newTransaction = async (data) => {
    //     const response = await fetch(`${hostUrl}/api/customer/transactions`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data),
    //     });

    //     if (response.status === 200) {
    //         const res = await response.json();
    //         setTransactionHistory([...transactionHistory, res?.data]);
    //     }
    // };

    const transferAsset = async (e) => {
        e.preventDefault();
        const isValid = ethers.isAddress(address);

        if (!isValid) {
            setError("Not a valid wallet address");
            return;
        } else {
            if (option === "klay") {
                onClose();
                const payload = {
                    from: ethersSigner.address,
                    to: address,
                    value: ethers.toBeHex(
                        ethers.parseEther(amount.toString()),
                        20
                    ),
                };

                console.log(payload);

                particle.evm
                    .sendTransaction(payload)
                    .then((txId) => {
                        const payload = {
                            crypto: "KLAY",
                            type: "withdrawal",
                            amount: amount,
                            tx_id: txId,
                            source_address: ethersSigner.address,
                            destination_address: address,
                        };

                        newTransaction(payload);
                    })
                    .catch((err) => {
                        alert("Error", err.msg);
                    });
            } else {
                onClose();
                console.log("tokenIface:", tokenIface);
                const data = tokenIface.encodeFunctionData(
                    "function transfer(address,uint256) public returns (bool)",
                    [address, ethers.parseEther(amount.toString())]
                );
                const payload = {
                    from: ethersSigner.address,
                    to: process.env.NEXT_PUBLIC_DIGIGOLD_TOKEN_ADDRESS,
                    data: data,
                };

                ethersSigner
                    .sendTransaction({
                        to: process.env.NEXT_PUBLIC_DIGIGOLD_TOKEN_ADDRESS,
                        data: data,
                    })
                    .then((res) => {
                        console.log("res:", res);
                        const payload = {
                            crypto: "DGOLD",
                            type: "withdrawal",
                            amount: amount,
                            tx_id: res.hash,
                            source_address: ethersSigner.address,
                            destination_address: address,
                        };

                        console.log("DGOLD Withdrawal Transaction:", payload);

                        newTransaction(payload);
                    })
                    .catch((err) => {
                        alert("Error", err.msg);
                    });
            }
        }
    };

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
                            <form onSubmit={transferAsset}>
                                <div className="mt-1 mb-4 relative rounded-lg flex-1  items-center grow flex w-full ">
                                    <select
                                        className="block w-full h-14 px-4 py-2  text-white bg-[#363636] border-0 focus:border-none rounded-lg focus:outline-none focus:ring-none  placeholder-white"
                                        defaultValue={"klay"}
                                        onChange={(e) => {
                                            setOption(e.target.value);
                                        }}
                                        required
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
                                        min={1}
                                        required
                                        onChange={(e) => {
                                            setAmount(e.target.value);
                                        }}
                                        defaultValue={amount}
                                        className={`py-2 px-4 block h-14 w-full sm:text-sm text-white bg-[#363636] border-0 focus:border-none rounded-lg focus:outline-none focus:ring-none placeholder-text-white`}
                                        autoComplete="off"
                                    />
                                </div>

                                <div className="my-2 relative rounded-lg flex-1 items-center grow flex h-14 w-full bg-[#363636]">
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        placeholder="Recipient address e.g 0x0..."
                                        required
                                        onChange={(e) => {
                                            setAddress(e.target.value);
                                        }}
                                        className={`py-2 px-4 block h-14 w-full sm:text-sm text-white bg-[#363636] border-0 focus:border-none rounded-lg focus:outline-none focus:ring-none placeholder-text-white`}
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="my-2 relative rounded-lg flex-1 items-center grow flex w-full">
                                    {error && (
                                        <h4 className="text-sm text-red-400">
                                            {error}
                                        </h4>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="text-white bg-[#FFCC29] h-12 flex items-center justify-center w-full rounded-lg cursor-pointer"
                                >
                                    <MoneySend
                                        size="20"
                                        color="#484848"
                                        className="mr-2"
                                    />
                                    <span className="text-[#484848] font-semibold">
                                        Withdraw
                                    </span>
                                </button>
                            </form>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default WithdrawModal;

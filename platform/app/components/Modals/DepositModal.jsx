"use client";

import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalBody,
    ModalHeader,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Accordion,
    AccordionItem,
    AccordionButton,
    Box,
    AccordionPanel,
} from "@chakra-ui/react";
import { CardReceiveIcon, CopyIcon, MoneyReceiveIcon } from "../IconComponent";
import Image from "next/image";
import { Wallet } from "iconsax-react";
import { rampSDK } from "@alchemy-pay/ramp-sdk";

const DepositCrypto = ({ user, walletAddress }) => {
    // const walletAddress = user?.wallets?.[1].public_address;
    const [depositCheck, setdepositCheck] = useState(true);
    return (
        <>
            <div className="">
                <Accordion className="space-y-4 pb-5">
                    <AccordionItem className="no-border bg-[#363636]">
                        {({ isExpanded }) => (
                            <>
                                <h2 className="rounded-lg">
                                    <AccordionButton className="py-4 rounded-lg inline-block text-left">
                                        <span
                                            className={`h-3 w-3 rounded-full ${
                                                isExpanded
                                                    ? "bg-[#FFCC29]"
                                                    : "bg-[#666666]"
                                            } inline-block mr-2`}
                                        ></span>
                                        <Box
                                            as="span"
                                            flex="1"
                                            textAlign="left"
                                        >
                                            Deposit to wallet address
                                        </Box>
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <div className="text-white">
                                        <div className="mt-1 mb-4 relative rounded-lg flex-1  items-center grow flex h-12 w-full ">
                                            <select
                                                className="block w-full h-14 px-4 py-2 mt-2 text-white bg-card-background border-0 focus:border-none rounded-lg focus:outline-none focus:ring-none  placeholder-white"
                                                defaultValue={"klay"}
                                            >
                                                <option value="klay">
                                                    KLAY
                                                </option>
                                                <option value="dgold">
                                                    DGOLD
                                                </option>
                                            </select>
                                        </div>
                                        <p className=" mb-2 text-sm mt-2">
                                            Deposit to this wallet address only
                                            on the Klaytn network
                                        </p>

                                        <div className="flex items-start my-4">
                                            <input
                                                id="agree3"
                                                type="checkbox"
                                                checked={true}
                                                onChange={() => {
                                                    setdepositCheck(
                                                        !depositCheck
                                                    );
                                                    console.log("checked");
                                                }}
                                                className="w-3 h-3 mt-1 accent-[#FFCC29]  rounded-full focus:ring-none"
                                            />
                                            <label
                                                htmlFor="agree3"
                                                className="ml-2 text-[13px]"
                                            >
                                                I totally understand I have to
                                                send my crypto to the BSC
                                                network
                                            </label>
                                        </div>

                                        <div className="mt-1 relative rounded-lg flex-1  items-center grow flex h-12 w-full ">
                                            <div className="absolute inset-y-0 right-0 flex items-center px-3">
                                                <div className="flex items-center z-50">
                                                    <button className="text-[#363636] px-3 bg-[#FFCC29] h-full py-2 rounded-[4px] flex items-center">
                                                        <CopyIcon />
                                                    </button>
                                                </div>
                                            </div>
                                            <input
                                                type="text"
                                                name="address"
                                                id="address"
                                                className={`py-2 px-4 block h-12 w-full pr-16 sm:text-sm text-white bg-card-background border-0 focus:border-none rounded-lg focus:outline-none focus:ring-none placeholder-text-white ${
                                                    !depositCheck
                                                        ? "opacity-30 blur"
                                                        : ""
                                                } `}
                                                autoComplete="off"
                                                minimum={10}
                                                defaultValue={walletAddress}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </AccordionPanel>
                            </>
                        )}
                    </AccordionItem>

                    <AccordionItem className="no-border bg-[#363636]">
                        {({ isExpanded }) => (
                            <>
                                <h2 className="rounded-lg">
                                    <AccordionButton className="py-4 rounded-lg inline-block text-left">
                                        <span
                                            className={`h-3 w-3 rounded-full ${
                                                isExpanded
                                                    ? "bg-[#FFCC29]"
                                                    : "bg-[#666666]"
                                            } inline-block mr-2`}
                                        ></span>
                                        <Box
                                            as="span"
                                            flex="1"
                                            textAlign="left"
                                        >
                                            Deposit with wallet
                                        </Box>
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <div>
                                        <div className="my-3 text-sm w-1/2 mx-auto">
                                            <a className="text-white bg-[#FFCC29] h-12 flex items-center justify-center w-full rounded-lg cursor-pointer">
                                                <Wallet
                                                    size={20}
                                                    color="#484848"
                                                    className="mr-2"
                                                />
                                                <button className="text-[#000000] font-semibold disabled opacity-50 cursor-no-drop">
                                                    Deposit with Metamask
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </AccordionPanel>
                            </>
                        )}
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    );
};

function DepositModal({ isOpen, onClose, user, profile, walletAddress }) {
    const [option, setOption] = useState(null);

    // console.log("profile", profile, user);

    useEffect(() => {
        if (option === "buy") {
            let ramp = new rampSDK({
                secret: process.env.NEXT_PUBLIC_ALCHEMY_APP_SECRET,
                appId: process.env.NEXT_PUBLIC_ALCHEMY_APP_ID,
                environment: "TEST",
                containerNode: "rampView",
                optionalParameter: {
                    crypto: "KLAY",
                    network: "KLAY",
                    fiat: profile?.country_currency,
                    address: walletAddress, //user?.wallets?.[1].public_address,
                    email: profile?.email,
                    // .....
                    // Parameters Tips:(The exact name and case of the parameter must be used.)
                    // For the full list of customisation options check the link above
                },
            });

            ramp.init();

            ramp.on("RAMP_WIDGET_CLOSE", (cb) => {
                ramp.close();
            });

            ramp.on("*", (cb) => {
                if (cb.eventName === "RAMP_WIDGET_CLOSE") {
                    ramp.close();
                }
            });
        }
    }, [option]);

    return (
        <>
            <Modal onClose={onClose} size="xl" isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent bg="#282827" color="#fff">
                    <ModalHeader>
                        {!option
                            ? "Fund Wallet"
                            : option === "deposit"
                            ? "Deposit Funds"
                            : option === "buy"
                            ? "Buy $KLAY"
                            : ""}
                    </ModalHeader>
                    <ModalCloseButton
                        onClick={() => {
                            onClose, setOption(null);
                        }}
                    />
                    <ModalBody>
                        <div>
                            {!option && (
                                <>
                                    <div className="grid grid-cols-2 gap-3 pb-4">
                                        {/* <div className=""> */}
                                        <button
                                            className="border-[0.5px] border-[#494949] rounded-lg p-3 py-3"
                                            onClick={() => {
                                                setOption("deposit");
                                            }}
                                        >
                                            <div className="flex flex-col justify-between h-full p-1 ">
                                                <div className="p-1 text-center flex items-center flex-col gap-2 text-white">
                                                    <h3 className="text-[15px] ">
                                                        I have crypto assets
                                                    </h3>
                                                    <div className="my-2 py-2">
                                                        <MoneyReceiveIcon
                                                            size={64}
                                                        />
                                                    </div>
                                                    <h2 className="text-sm text-[#FFCC29] font-semibold underline underline-offset-1">
                                                        Deposit $KLAY, $DGOLD
                                                    </h2>
                                                    <p className="text-[13px] py-1">
                                                        Add crypto to wallet
                                                        using either deposit to
                                                        an address, or connect
                                                        metamask wallet{" "}
                                                    </p>
                                                </div>
                                                <p className="inline-block text-xs text-left">
                                                    <span className="h-2 w-2 rounded-full  bg-[#FFCC29] inline-block mr-2"></span>
                                                    Suggested for experienced
                                                    users
                                                </p>
                                            </div>
                                            {/* </div> */}
                                        </button>

                                        {/* <div className=""> */}
                                        <button
                                            className="border-[0.5px] border-[#494949] rounded-lg p-3 py-3"
                                            onClick={() => {
                                                setOption("buy");
                                            }}
                                        >
                                            <div className="flex flex-col justify-between h-full p-1 ">
                                                <div className="text-center flex items-center flex-col gap-2 text-white flex-1">
                                                    <h3 className="text-[15px] ">
                                                        I don&apos;t have crypto
                                                        assets
                                                    </h3>
                                                    <div className="my-2 py-2">
                                                        <CardReceiveIcon
                                                            size={64}
                                                        />
                                                    </div>
                                                    <h2 className="text-sm text-[#FFCC29] font-semibold underline underline-offset-1">
                                                        Buy Crypto
                                                    </h2>
                                                    <p className="text-[13px]  py-1">
                                                        Buy crypto directly with
                                                        your credit/debit card
                                                        using Alchemy Pay.
                                                    </p>
                                                </div>
                                                <p className="inline-block text-xs text-left">
                                                    <span className="h-2 w-2 rounded-full  bg-[#FFCC29] inline-block mr-2"></span>
                                                    Suggested for new users
                                                </p>
                                            </div>

                                            {/* </div> */}
                                        </button>
                                    </div>
                                </>
                            )}

                            {option === "deposit" && (
                                <DepositCrypto user={user} />
                            )}

                            {option === "buy" && (
                                <div
                                    className="px-6"
                                    style={{ height: "650px" }}
                                    id="rampView"
                                ></div>
                            )}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default DepositModal;

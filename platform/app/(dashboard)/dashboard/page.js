"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { MoneySend, MoneyReceiveIcon, MoneyRecive } from "iconsax-react";

import Notification from "@/app/components/Notification";
import CardComponent from "@/app/components/PageLayout/CardComponent";
import MainComponent from "@/app/components/PageLayout/MainComponent";
import { PageTitle } from "@/app/components/PageLayout/PageTitle";
import TransactionsTable from "@/app/components/DataTable/TransactionsTable";
import axios from "axios";
import Image from "next/image";
import { EyeIcon } from "@/app/components/IconComponent";
import DepositModal from "@/app/components/Modals/DepositModal";
import { user } from "@/public/data";
import WithdrawModal from "@/app/components/Modals/WithdrawModal";

const Dashboard = () => {
    const [usdcBalance, setUsdcBalance] = useState(0.0);
    const [dGoldBalance, setdGoldBalance] = useState(0.0);
    const [walletAddress, setWalletAddress] = useState("");
    const [transactionHistory, setTransactionHistory] = useState([]);

    const authUser = null;

    // const getAssets = async () => {
    //   const hostUrl = process.env.NEXT_PUBLIC_AUTH_URL;
    //   const res = await axios.get(`${hostUrl}/api/customer/asset`, {
    //     withCredentials: true,
    //   });

    //   return res?.data?.data;
    // };
    // const getTransactionHistory = async () => {
    //   const hostUrl = process.env.NEXT_PUBLIC_AUTH_URL;
    //   const res = await axios.get(`${hostUrl}/api/customer/transactions`, {
    //     withCredentials: true,
    //   });

    //   return res?.data?.data;
    // };

    // useEffect(() => {
    //     if (user && user?.fireblock_vault_id) {
    //         getAssets().then((balances) => {
    //             if (balances) {
    //                 setUsdcBalance(balances.usdc);
    //                 setdGoldBalance(balances.dGold);
    //             }
    //         });

    //         getTransactionHistory().then((transactions) => {
    //             if (transactions) {
    //                 setTransactionHistory(transactions);
    //             }
    //         });
    //     }
    // }, [user]);

    const {
        isOpen: depositIsOpen,
        onOpen: onDepositOpen,
        onClose: onDepositClose,
    } = useDisclosure();

    const {
        isOpen: withdrawIsOpen,
        onOpen: onWithdrawOpen,
        onClose: onWithdrawClose,
    } = useDisclosure();
    const depositBtnRef = useRef();
    const withdrawBtnRef = useRef();

    return (
        <>
            {user !== null && (
                <>
                    <Notification user={user} />

                    <div>
                        <div className="w-full flex items-center justify-between flex-wrap mb-6 gap-2">
                            <PageTitle title={"Welcome to DigiGold"} />
                            <div className="flex items-center gap-5 flex-wrap">
                                <button
                                    className="flex border border-[#FFCC29] px-6 py-3 rounded-lg text-[#FFCC29] text-sm"
                                    ref={withdrawBtnRef}
                                    onClick={onWithdrawOpen}
                                >
                                    <MoneySend
                                        size="20"
                                        color="#FFCC29"
                                        className="mr-1"
                                    />
                                    Withdraw{" "}
                                </button>
                                <button
                                    ref={depositBtnRef}
                                    onClick={onDepositOpen}
                                    className="flex bg-[#FFCC29] px-6 py-3 rounded-lg text-[#484848] text-sm"
                                >
                                    Deposit
                                    <MoneyRecive
                                        size="20"
                                        color="#484848"
                                        className="ml-1"
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-3 w-full gap-5 ">
                                <CardComponent>
                                    <div className="w-full flex items-center justify-between flex-row md:gap-0 gap-3">
                                        <div className="flex items-center justify-start flex-row gap-2">
                                            <h5 className="text-base text-white font-medium">
                                                Funding Wallet
                                            </h5>
                                            <div>
                                                <select
                                                    defaultValue="klay"
                                                    className="text-white selection:px-3 px-2  py-1 rounded-lg focus-visible:outline-none focus-within:outline-none focus:outline-none text-xs bg-[#363636]"
                                                >
                                                    <option value="klay">
                                                        KLAY
                                                    </option>
                                                    <option value="usd">
                                                        USD
                                                    </option>
                                                    {user &&
                                                    user?.country_currency ? (
                                                        <option value={2}>
                                                            {
                                                                user?.country_currency
                                                            }
                                                        </option>
                                                    ) : (
                                                        ""
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <span className="text-[#D9D9D9]">
                                            <EyeIcon />
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-[#C0C0C0] text-sm ">
                                            Total Balance
                                        </p>
                                        <h3 className="text-3xl text-white">
                                            ${usdcBalance}
                                        </h3>
                                    </div>
                                </CardComponent>

                                <CardComponent>
                                    <div className="w-full flex items-center justify-between flex-row md:gap-0 gap-3">
                                        <div className="flex items-center justify-start flex-row  gap-2">
                                            <h5 className="text-base text-white font-medium">
                                                Gold Wallet
                                            </h5>
                                            <span className="px-3 py-1 text-white bg-[#7B6941] rounded-3xl text-xs">
                                                $DGOLD
                                            </span>
                                        </div>
                                        <span className="text-[#D9D9D9]">
                                            <EyeIcon />
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-[#C0C0C0] text-sm ">
                                            Total Balance
                                        </p>
                                        <h3 className="text-3xl text-white">
                                            ${dGoldBalance}
                                        </h3>
                                    </div>
                                </CardComponent>

                                <CardComponent>
                                    <div className="w-full flex items-start justify-between flex-col gap-1">
                                        <h5 className="text-base text-[#C0C0C0] font-medium">
                                            PNL 30 Days
                                        </h5>
                                        <p className="inline-flex items-center text-sm">
                                            <span className=" text-white">
                                                + $0.00
                                            </span>
                                            <span className="text-[#8BFFC9] text-xs ml-2">
                                                +0.0%
                                            </span>
                                        </p>
                                    </div>

                                    <div className="space-y-2"></div>
                                </CardComponent>
                            </div>

                            <MainComponent>
                                <div className=" ">
                                    <h3 className="text-lg font-medium text-left mb-4 text-white">
                                        Transaction History
                                    </h3>

                                    {transactionHistory.length > 0 ? (
                                        <TransactionsTable
                                            transactions={transactionHistory}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center py-20 flex-col gap-2">
                                            <Image
                                                src="/images/no-transactions.png"
                                                alt="No Transaction"
                                                height={150}
                                                width={100}
                                                className="object-contain"
                                                //   layout="responsive"
                                            />
                                            <p className="text-sm text-[#C0C0C0]">
                                                No transactions
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </MainComponent>
                        </div>
                    </div>
                </>
            )}

            {user && (
                <>
                    <DepositModal
                        isOpen={depositIsOpen}
                        onClose={onDepositClose}
                        btnRef={depositBtnRef}
                        user={user}
                    />

                    <WithdrawModal
                        isOpen={withdrawIsOpen}
                        onClose={onWithdrawClose}
                        btnRef={withdrawBtnRef}
                        user={user}
                    />
                </>
            )}
        </>
    );
};

export default Dashboard;

"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { MoneySend, MoneyReceiveIcon, MoneyRecive } from "iconsax-react";

import Notification from "@/app/components/Notification";
import CardComponent from "@/app/components/PageLayout/CardComponent";
import MainComponent from "@/app/components/PageLayout/MainComponent";
import { PageTitle } from "@/app/components/PageLayout/PageTitle";
import TransactionsTable from "@/app/components/DataTable/TransactionsTable";
import Image from "next/image";
import { EyeIcon } from "@/app/components/IconComponent";
import DepositModal from "@/app/components/Modals/DepositModal";
import WithdrawModal from "@/app/components/Modals/WithdrawModal";
import { useUser } from "@auth0/nextjs-auth0/client";
import { particleWallet } from "@/app/utils/client_common";
import { ethers, Interface } from "ethers";

const Dashboard = () => {
    const [klayBalance, setKlayBalance] = useState(0.0);
    const [dGoldBalance, setdGoldBalance] = useState(0.0);
    const [walletAddress, setWalletAddress] = useState("");
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [token, setToken] = useState("");
    const [profile, setProfile] = useState(null);
    const [particle, setParticle] = useState(null);
    const [walletProfile, setWalletProfile] = useState(null);
    const [ethersProvider, setEthersProvider] = useState(null);
    const [klayUsd, setKlayUsd] = useState(0.0);
    const [goldUsd, setGoldUsd] = useState(0.0);

    const { user, isLoading } = useUser();
    const hostUrl = process.env.NEXT_PUBLIC_HOST_URL;

    const getData = async (uri) => {
        const response = await fetch(uri);
        return response.json();
    };
    const tokenIface = new ethers.Interface([
        "function balanceOf(address owner) view returns (uint256)",
        "event Transfer(address indexed from, address indexed to, uint256 value)",
    ]);
    const exchangeIface = new ethers.Interface([
        "function klayUsdPrice() view returns (uint256)",
        "function goldUsdPrice() view returns (uint256)",
        "function calculateGoldOutAndFee(uint256) public view returns (uint256,uint256,uint256)",
        "function fectchLatestPrices() public",
    ]);

    const getdGoldBalance = async (_walletAddress, _ethersProvider) => {
        const data = tokenIface.encodeFunctionData("balanceOf(address)", [
            _walletAddress,
        ]);

        const balance = await _ethersProvider.provider.call({
            from: _walletAddress,
            to: process.env.NEXT_PUBLIC_DIGIGOLD_TOKEN_ADDRESS,
            data: data,
        });

        setdGoldBalance(
            Number(ethers.formatEther(balance)).toFixed(3).slice(0, -1)
        );
    };

    const fetchOraclePrices = async (
        _walletAddress,
        _ethersProvider,
        _ethersSigner
    ) => {
        const dataK = exchangeIface.encodeFunctionData("klayUsdPrice", []);
        const dataG = exchangeIface.encodeFunctionData("goldUsdPrice", []);

        // const dataF = exchangeIface.encodeFunctionData(
        //     "fectchLatestPrices",
        //     []
        // );
        // const fetch = await _ethersSigner.sendTransaction({
        //     from: _walletAddress,
        //     to: process.env.NEXT_PUBLIC_DIGIGOLD_EXCHANGE_ADDRESS,
        //     data: dataF,
        // });

        const klayPrice = await _ethersProvider.provider.call({
            from: _walletAddress,
            to: process.env.NEXT_PUBLIC_DIGIGOLD_EXCHANGE_ADDRESS,
            data: dataK,
        });

        const goldPrice = await _ethersProvider.provider.call({
            from: _walletAddress,
            to: process.env.NEXT_PUBLIC_DIGIGOLD_EXCHANGE_ADDRESS,
            data: dataG,
        });

        setKlayUsd(
            Number(ethers.formatUnits(klayPrice, 9)).toFixed(3).slice(0, -1)
        );
        setGoldUsd(
            Number(ethers.formatUnits(goldPrice, 9)).toFixed(3).slice(0, -1)
        );
    };

    useEffect(() => {
        if (user) {
            getData(`${hostUrl}/api/customer/profile`).then((data) => {
                setProfile(data?.data);
            });

            getData(`${hostUrl}/api/customer/token`).then((data) => {
                setToken(data?.data);
            });
        }
    }, [user]);

    useEffect(() => {
        if (token) {
            particleWallet(token).then(
                ({
                    particle,
                    account,
                    walletProfile,
                    ethersProvider,
                    ethersSigner,
                }) => {
                    setWalletAddress(account);
                    setParticle(particle);
                    setWalletProfile(walletProfile);
                    setEthersProvider(ethersProvider);
                    getdGoldBalance(account, ethersProvider);
                    fetchOraclePrices(account, ethersProvider, ethersSigner);
                }
            );
        }
    }, [token]);

    useEffect(() => {
        if (ethersProvider && walletAddress) {
            ethersProvider.provider
                .getBalance(walletAddress)
                .then((balance) => {
                    console.log({ balance: ethers.formatEther(balance) });
                    setKlayBalance(
                        Number(ethers.formatEther(balance))
                            .toFixed(3)
                            .slice(0, -1)
                    );
                });
        }
    }, [ethersProvider]);

    useEffect(() => {
        const contract = new ethers.Contract(
            process.env.NEXT_PUBLIC_DIGIGOLD_TOKEN_ADDRESS,
            [
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: "address",
                            name: "from",
                            type: "address",
                        },
                        {
                            indexed: true,
                            internalType: "address",
                            name: "to",
                            type: "address",
                        },
                        {
                            indexed: false,
                            internalType: "uint256",
                            name: "value",
                            type: "uint256",
                        },
                    ],
                    name: "Transfer",
                    type: "event",
                },
            ],
            ethersProvider
        );

        // if (ethersProvider && walletAddress) {
        //     console.log("filter:", contract.filters.Transfer, walletAddress);

        //     contract.on(
        //         contract.filters.Transfer(null, walletAddress),
        //         "Transfer",
        //         (from, to, value) => {
        //             console.log("Transfer event", { from, to, value });
        //         }
        //     );
        // }

        // return () => {
        //     contract.removeAllListeners();
        // };
    }, [ethersProvider]);

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
                    <Notification user={profile} />

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
                                                    {/* <option value="usd">
                                                        USD
                                                    </option>
                                                    {profile &&
                                                    profile?.country_currency ? (
                                                        <option value={2}>
                                                            {
                                                                profile?.country_currency
                                                            }
                                                        </option>
                                                    ) : (
                                                        ""
                                                    )} */}
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
                                            {klayBalance} {""}
                                            <span className="text-sm">
                                                (~ $
                                                {(
                                                    klayBalance * klayUsd
                                                ).toFixed(2)}
                                                )
                                            </span>
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
                                            {dGoldBalance} {""}
                                            <span className="text-sm">
                                                (~ $
                                                {(
                                                    goldUsd * dGoldBalance
                                                ).toFixed()}{" "}
                                                )
                                            </span>
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

            {walletProfile && walletProfile?.wallets && (
                <>
                    {walletAddress && (
                        <DepositModal
                            isOpen={depositIsOpen}
                            onClose={onDepositClose}
                            btnRef={depositBtnRef}
                            user={walletProfile}
                        />
                    )}

                    <WithdrawModal
                        isOpen={withdrawIsOpen}
                        onClose={onWithdrawClose}
                        btnRef={withdrawBtnRef}
                        user={profile}
                    />
                </>
            )}
        </>
    );
};

export default Dashboard;

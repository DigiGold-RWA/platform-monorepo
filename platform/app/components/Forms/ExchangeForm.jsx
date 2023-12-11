"use client";
import React, { useEffect, useState } from "react";
import { CopyIcon, LoaderIcon } from "../IconComponent";
import { ArrowSwapHorizontal, ArrowSwapVertical } from "iconsax-react";
import Image from "next/image";
import { particleWallet } from "@/app/utils/client_common";
import { ethers, Interface, N } from "ethers";
import {
    particleWallet as particleAuth,
    getData,
    hostUrl,
} from "@/app/utils/client_common";
import { useUser } from "@auth0/nextjs-auth0/client";

const ExchangeForm = () => {
    const [fetching, setFetching] = useState(false);
    const [quote, setQuote] = useState(null);
    const [klayBalance, setKlayBalance] = useState(0.0);
    const [dGoldBalance, setdGoldBalance] = useState(0.0);
    const [option, setOption] = useState("init"); //init, quote_ready
    const [particle, setParticle] = useState(null);
    const [walletProfile, setWalletProfile] = useState(null);
    const [ethersProvider, setEthersProvider] = useState(null);
    const [swapAmountInKlay, setSwapAmountInKlay] = useState(0.0);
    const [outAmountInGold, setOutAmountInGold] = useState(0.0);
    const [feeOut, setFeeOut] = useState(0.0);
    const [ethersSigner, setEthersSigner] = useState(null);
    const [error, setError] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);

    const [profile, setProfile] = useState(null);
    const [token, setToken] = useState("");

    const { user, isLoading } = useUser();

    const tokenIface = new ethers.Interface([
        "function balanceOf(address owner) view returns (uint256)",
        "function transfer(address,uint256) public returns (bool)",
        "event Transfer(address indexed from, address indexed to, uint256 value)",
    ]);
    const exchangeIface = new ethers.Interface([
        "function klayUsdPrice() view returns (uint256)",
        "function goldUsdPrice() view returns (uint256)",
        "function calculateGoldOutAndFee(uint256) public view returns (uint256,uint256,uint256)", //goldOutBeforeFee, goldOut, feeOut
        "function fectchLatestPrices() public",
    ]);

    const fetchQuote = async (e) => {
        setError(null);
        setFetching(true);
        e.preventDefault();

        if (parseFloat(e.target.klay.value) < 350) {
            setError("Minimum amount to mint is 300 KLAY");
            setFetching(false);
            return;
        }

        if (option === "init") {
            particle.evm
                .sendTransaction({
                    from: walletAddress,
                    to: process.env.NEXT_PUBLIC_DIGIGOLD_EXCHANGE_ADDRESS,
                    data: exchangeIface.encodeFunctionData(
                        "fectchLatestPrices()"
                    ),
                })
                .then(async (oracleRes) => {
                    console.log("oracleRes", swapAmountInKlay, oracleRes);

                    try {
                        const data = exchangeIface.encodeFunctionData(
                            "function calculateGoldOutAndFee(uint256) public view returns (uint256,uint256,uint256)",
                            [ethers.parseEther(swapAmountInKlay.toString())]
                        );
                        const outputRes = await ethersProvider.provider.call({
                            from: walletAddress,
                            to: process.env
                                .NEXT_PUBLIC_DIGIGOLD_EXCHANGE_ADDRESS,
                            data: data,
                        });

                        const decoded = exchangeIface.decodeFunctionResult(
                            "function calculateGoldOutAndFee(uint256) public view returns (uint256,uint256,uint256)",
                            outputRes
                        );

                        setOutAmountInGold(
                            Number(ethers.formatEther(decoded?.[1]))
                                .toFixed(3)
                                .slice(0, -1)
                        );
                        setQuote({
                            goldOutBeforeFee: Number(
                                ethers.formatEther(decoded?.[0])
                            )
                                .toFixed(3)
                                .slice(0, -1),
                            goldOut: Number(ethers.formatEther(decoded?.[1]))
                                .toFixed(3)
                                .slice(0, -1),
                            feeOut: Number(ethers.formatEther(decoded?.[2]))
                                .toFixed(3)
                                .slice(0, -1),
                        });

                        setOption("quote_ready");
                        setFetching(false);
                    } catch (err) {
                        console.log("calculateGoldOutAndFee: ", err);
                        setError(err.message);
                        setFetching(false);
                    }
                })
                .catch((err) => {
                    console.log("fectchLatestPrices:", err);
                    setError(err.message);
                    setFetching(false);
                });
        }

        if (option === "quote_ready") {
            setFetching(true);

            ethersSigner
                .sendTransaction({
                    to: process.env.NEXT_PUBLIC_DIGIGOLD_EXCHANGE_ADDRESS,
                    value: ethers.toBeHex(
                        ethers.parseEther(swapAmountInKlay.toString()),
                        20
                    ),
                    data: "0x0123456789abcdef", //Invalid data to trigger fallback function
                })
                .then(async (tx) => {
                    console.log("tx:", tx);

                    setKlayBalance(
                        Number(klayBalance) - Number(swapAmountInKlay)
                    );
                    setdGoldBalance(
                        Number(dGoldBalance) + Number(quote?.goldOut)
                    );
                    setFetching(false);
                    setOption("init");

                    newTransaction({
                        type: "swap",
                        crypto: "KLAY",
                        tx_id: tx.hash,
                        amount: swapAmountInKlay,
                        source_address: tx.from,
                        destination_address: tx.to,
                    });

                    newTransaction({
                        type: "swap",
                        crypto: "DGOLD",
                        tx_id: tx.hash,
                        amount: quote?.goldOut,
                        source_address: tx.to,
                        destination_address: tx.from,
                    });

                    setQuote(null);
                })
                .catch((err) => {
                    console.log("Swap Error:", err);
                    setError(err.message);
                    setFetching(false);
                });
        }
    };

    const newTransaction = async (data) => {
        const response = await fetch(`${hostUrl}/api/customer/transactions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.status === 200) {
            const res = await response.json();

            console.log(res);
        }
    };

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
    const getKlayBalance = async (_walletAddress, _ethersProvider) => {
        _ethersProvider.provider.getBalance(_walletAddress).then((balance) => {
            setKlayBalance(
                Number(ethers.formatEther(balance)).toFixed(3).slice(0, -1)
            );
            setSwapAmountInKlay(
                Number(ethers.formatEther(balance)).toFixed(3).slice(0, -1)
            );
        });
    };

    useEffect(() => {
        if (user) {
            getData(`${hostUrl}/api/customer/profile`).then((data) => {
                if (data) setProfile(data?.data);
            });

            getData(`${hostUrl}/api/customer/token`).then((data) => {
                if (data) setToken(data?.data);
            });
        }
    }, [user]);

    useEffect(() => {
        if (token) {
            particleAuth(token).then(
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
                    setEthersSigner(ethersSigner);
                    getdGoldBalance(account, ethersProvider);
                    getKlayBalance(account, ethersProvider);
                }
            );
        }
    }, [token]);

    return (
        <div>
            <form action="#" onSubmit={fetchQuote}>
                <div className="flex flex-col mb-2 gap-6">
                    <div>
                        <div className="relative rounded-lg flex-1  items-center grow flex h-12 w-full ">
                            <div className="absolute inset-y-0 left-0 flex items-center px-3">
                                <div className="flex items-center z-30">
                                    <div className="text-white px-3  h-full py-2 rounded-[4px] flex items-center gap-2">
                                        <Image
                                            src="/Icons/KLAY.png"
                                            alt="KLAY"
                                            width={20}
                                            height={20}
                                            className="object-contain"
                                        />
                                        <span>KLAY</span>
                                    </div>
                                </div>
                            </div>
                            <input
                                type="text"
                                name="klay"
                                id="klay"
                                required
                                min={300}
                                onChange={(e) => {
                                    setSwapAmountInKlay(e.target.value);
                                }}
                                className={`py-2 px-4 block h-12 w-full pl-28 sm:text-sm text-white bg-card-background border-0 focus:border-none rounded-lg focus:outline-none focus:ring-none placeholder-text-white text-right`}
                                autoComplete="off"
                                defaultValue={klayBalance}
                            />
                        </div>
                        <p className="text-right text-white text-xs mt-1">
                            KLAY balance: {klayBalance}
                        </p>
                    </div>

                    <div className="w-full mx-auto flex items-center justify-center">
                        <a
                            href="#"
                            className="h-12 p-3 rounded-full bg-[#363636] "
                        >
                            <ArrowSwapVertical size={24} color="#fff" />
                        </a>
                    </div>

                    <div>
                        <div className="relative rounded-lg flex-1  items-center grow flex h-12 w-full ">
                            <div className="absolute inset-y-0 left-0 flex items-center px-3">
                                <div className="flex items-center z-30">
                                    <div className="text-white px-3  h-full py-2 rounded-[4px] flex items-center gap-2">
                                        <Image
                                            src="/Icons/Digigold.png"
                                            alt="DGOLD"
                                            width={20}
                                            height={20}
                                            className="object-contain"
                                        />
                                        <span>DGOLD</span>
                                    </div>
                                </div>
                            </div>
                            <input
                                type="text"
                                name="dgold"
                                id="dgold"
                                readOnly
                                className={`py-2 px-4 block h-12 w-full pl-28 sm:text-sm text-white bg-card-background border-0 focus:border-none rounded-lg focus:outline-none focus:ring-none placeholder-text-white text-right`}
                                autoComplete="off"
                                value={outAmountInGold}
                            />
                        </div>
                        <p className="text-right text-white text-xs mt-1">
                            DGOLD balance: {dGoldBalance}
                        </p>
                    </div>

                    {particle && ethersSigner && option === "init" && (
                        <div className="flex w-full mb">
                            {fetching ? (
                                <a className="disabled cursor-not-allowed h-[50px] py px-4 w-full cursor-no-drop  bg-[#FFCC29]  focus:ring-offset-none text-[#484848] transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-none rounded-lg flex items-center justify-center ">
                                    <LoaderIcon className="animate-spin mr-1" />{" "}
                                    Fetching...
                                </a>
                            ) : (
                                <button
                                    type="submit"
                                    className="h-[50px] py px-4 w-full bg-[#FFCC29]  focus:ring-offset-none text-[#484848] transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-none rounded-lg flex items-center justify-center "
                                >
                                    Get Quote
                                </button>
                            )}
                        </div>
                    )}

                    {particle && ethersSigner && option === "quote_ready" && (
                        <div className="flex w-full m b">
                            {fetching ? (
                                <a className="disabled cursor-not-allowed h-[50px] py px-4 w-full cursor-no-drop  bg-[#FFCC29]  focus:ring-offset-none text-[#484848] transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-none rounded-lg flex items-center justify-center ">
                                    <LoaderIcon className="animate-spin mr-1" />{" "}
                                    Finalizing...
                                </a>
                            ) : (
                                <button
                                    type="submit"
                                    className="h-[50px] py px-4 w-full bg-[#FFCC29]  focus:ring-offset-none text-[#484848] transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-none rounded-lg flex items-center justify-center "
                                >
                                    Confirm Swap
                                </button>
                            )}
                        </div>
                    )}

                    {error && (
                        <div
                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5"
                            role="alert"
                        >
                            <strong className="font-bold">
                                There was an error in your request
                            </strong>
                            <p>{error}</p>
                        </div>
                    )}

                    {quote && (
                        <div className="divide-y ">
                            <h4 className="text-white border-bs">
                                Quote Review
                            </h4>
                            <div className="flex items-center py-3 justify-between flex-wrap text-white">
                                <p className="text-sm ">Gold Out</p>
                                <span className="text-sm text-white ">
                                    {quote?.goldOutBeforeFee} $GOLD
                                </span>
                            </div>
                            <div className="flex items-center py-3 justify-between flex-wrap">
                                <p className="text-sm text-white ">Mint Fee</p>
                                <span className="text-sm text-white">
                                    {quote?.feeOut} $GOLD
                                </span>
                            </div>
                            <div className="flex items-center py-3 justify-between flex-wrap">
                                <p className="text-sm text-white ">
                                    Your Receive
                                </p>
                                <span className="text-sm text-white">
                                    {quote?.goldOut} $GOLD
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ExchangeForm;

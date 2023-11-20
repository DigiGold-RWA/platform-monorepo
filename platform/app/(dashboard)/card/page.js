'use client';
import React, { useState } from 'react';

import { PageTitle } from '@/app/components/PageLayout/PageTitle';
import Image from 'next/image';
import { EyeIcon } from '@/app/components/IconComponent';
import { Eye, EyeSlash } from 'iconsax-react';
import { transacData } from '@/public/data';
import TransactionCard from '@/app/components/TransactionCard';
import EmptyState from '@/app/components/EmptyState';

const GoldCard = () => {
  const [visibleCard, setVisibleCard] = useState(false);
  return (
    <>
      <div>
        <div className="mb-4">
          <PageTitle title={'Gold Card'} />
        </div>

        <div className="w-full  rounded-2xl pb-12 mb-5">
          <div className="flex w-full gap-4 lg:gap-2 lg:flex-nowrap flex-wrap  rounded-2xl">
            <div className="w-full lg:w-4/12 px-0 lg:px-4 ">
              {/* <div className="h-10 rounded-t-2xl bg-card-background"></div> */}
              <div className="bg-[#141414] p-5 h-64 rounded-2xl w-full text-white relative block ">
                <div className="h-full flex flex-col justify-between">
                  <div className="w-full flex items-center justify-between flex-row md:gap-0 gap-3">
                    <div className="flex items-center justify-start flex-row  gap-2">
                      <Image
                        src="/Logo/logo_main.svg"
                        alt="logo"
                        width={20}
                        height={20}
                        className="object-contain pointer-events-none"
                      />
                      <h5 className="text-base text-white font-medium">
                        Card Balance
                      </h5>
                    </div>
                    <span className="px-3 py-1 text-white bg-[#7B6941] rounded-3xl text-xs">
                      Gold
                    </span>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-sm">Balance</span>
                      <button
                        className="text-[#D9D9D9]"
                        onClick={() => setVisibleCard(!visibleCard)}
                      >
                        {visibleCard ? (
                          <EyeSlash size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    <h2 className="text-5xl inline-block">
                      <span className="">$</span>

                      {visibleCard ? '1451.07' : '*****'}
                    </h2>
                  </div>

                  <div className="flex flex-col gap-2 items-end justify-end">
                    <h3 className="text-lg">**** *** **** 1234</h3>

                    <p className="text-sm">
                      Expiry: <span>03/20</span>
                    </p>
                  </div>
                </div>

                {/* <div className=" block "> */}
                <Image
                  src="/Logo/logo_main.svg"
                  alt="logo"
                  fill
                  className="object-contain absolute opacity-10 blur-sm pointer-events-none w-full h-full"
                />
                {/* </div> */}
              </div>

              <div>
                <div className="grid grid-cols-4 gap-2 mt-3">
                  <button className="px-4 py-3 hover:bg-card-background text-white flex items-center justify-center gap-3 flex-col text-center">
                    <div className="flex w-full items-center justify-center">
                      <Image
                        src="/Logo/logo_main.svg"
                        alt="logo"
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h2 className="card-title text-xs  whitespace-nowrap">
                        Top Up
                      </h2>
                    </div>
                  </button>
                  <button className="px-4 py-3 hover:bg-card-background text-white flex items-center justify-center gap-3 flex-col text-center">
                    <div className="flex w-full items-center justify-center">
                      <Image
                        src="/Logo/logo_main.svg"
                        alt="logo"
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h2 className="card-title text-xs whitespace-nowrap">
                        Withdraw
                      </h2>
                    </div>
                  </button>
                  <button className="px-4 py-3 hover:bg-card-background text-white flex items-center justify-center gap-3 flex-col text-center">
                    <div className="flex w-full items-center justify-center">
                      <Image
                        src="/Logo/logo_main.svg"
                        alt="logo"
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h2 className="card-title text-xs whitespace-nowrap">
                        View card info
                      </h2>
                    </div>
                  </button>
                  <button className="px-4 py-3 hover:bg-card-background text-white flex items-center justify-center gap-3 flex-col text-center">
                    <div className="flex w-full items-center justify-center">
                      <Image
                        src="/Logo/logo_main.svg"
                        alt="logo"
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h2 className="card-title text-xs whitespace-nowrap">
                        Manage
                      </h2>
                    </div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <button className="px-4 py-3 rounded-2xl  bg-card-background text-white flex items-start justify-start gap-3 flex-col text-left">
                  <div className="mb-2">
                    <Image
                      src="/Logo/logo_main.svg"
                      alt="logo"
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-1 flex-1">
                    <h2 className="card-title text-sm">
                      Today&apos;s Spending
                    </h2>
                    <p className="text-sm">
                      <span className="font-bold text-xl">0.00</span> USD
                    </p>
                  </div>
                </button>

                <button className="px-4 py-3 rounded-2xl  bg-card-background text-white flex items-start justify-start gap-3 flex-col text-left">
                  <div className="mb-2">
                    <Image
                      src="/Logo/logo_main.svg"
                      alt="logo"
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-1 flex-1">
                    <h2 className="card-title text-sm">Daily Limit</h2>
                    <p className="text-sm">
                      <span className="font-bold text-xl">0.00</span> USD
                    </p>
                  </div>
                </button>
              </div>
            </div>
            <div className="w-full lg:w-8/12  rounded-2xl mt-8 lg:mt-0">
              {/* <div className="h-10 rounded-t-2xl bg-card-background"></div> */}
              <div className="h-full w-full rounded-2xl bg-[#141414]">
                <div className="h-10 rounded-t-2xl bg-card-background text-white px-3 flex items-center">
                  Transactions
                </div>

                <div className="w-full my-3 px-3 space-y-3 h-[420px] overflow-y-scroll transaction_card">
                  {transacData.length > 0 ? (
                    transacData.map((trans, index) => (
                      // <>
                      <TransactionCard key={index} trans={trans} />
                      // </>
                    ))
                  ) : (
                    <>
                      <EmptyState title={'No transactions yet'} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoldCard;

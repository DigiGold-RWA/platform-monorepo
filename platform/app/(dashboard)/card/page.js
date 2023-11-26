'use client';
import React, { useState } from 'react';

import { PageTitle } from '@/app/components/PageLayout/PageTitle';
import Image from 'next/image';
import {
  AddCircle,
  Check,
  EyeIcon,
  InfoCircle,
  SendSquare,
  SettingIcon,
} from '@/app/components/IconComponent';
import { Add, Eye, EyeSlash } from 'iconsax-react';
import {
  cardRechargeData,
  cardWithdrawalData,
  transacData,
} from '@/public/data';
import TransactionCard from '@/app/components/TransactionCard';
import EmptyState from '@/app/components/EmptyState';
import { UseCases } from '@/app/lib/constants';
import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import CardWithdrawalTable from '@/app/components/DataTable/CardWithdrawalTable';
import CardRechargesTable from '@/app/components/DataTable/CardRechargesTable';
import TransactionsTable from '@/app/components/DataTable/TransactionsTable';

const GoldCard = () => {
  const [visibleCard, setVisibleCard] = useState(false);
  return (
    <>
      <div>
        <div className="mb-4 flex items-center justify-start gap-4">
          <PageTitle title={'Gold Card'} />

          <p className="border-[0.5px] border-[#8BFFC9] rounded-2xl px-2 py-1 text-[#8BFFC9] text-xs inline-block">
            <span className="h-2 w-2 rounded-full  bg-[#8BFFC9] inline-block mr-2"></span>
            Coming soon
          </p>
        </div>

        <div className="w-full  rounded-2xl pb-12 mb-5">
          <div className="flex w-full gap-4 lg:gap-2 lg:flex-nowrap flex-wrap  rounded-2xl">
            <div className="w-full lg:w-4/12 px-0 lg:px-4 ">
              {/* <div className="h-10 rounded-t-2xl bg-card-background"></div> */}
              <div className=" p-5 h-64 rounded-2xl w-full text-white relative block bg-card-goldBackground border-[0.97px] gold_card">
                <div className="h-full flex flex-col justify-between">
                  <div className="w-full flex items-center justify-between flex-row md:gap-0 gap-3">
                    <div className="flex items-center justify-start flex-row  gap-2">
                      <Image
                        src="/Logo/digigold_gray.png"
                        alt="logo"
                        width={45}
                        height={20}
                        className="object-contain pointer-events-none"
                      />
                    </div>
                    <div className="flex items-center justify-start flex-row  gap-2">
                      <Image
                        src="/images/Card images.svg"
                        alt="logo"
                        width={45}
                        height={20}
                        className="object-contain pointer-events-none"
                      />
                    </div>
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

                  <div className="flex gap-2 items-end justify-between w-full">
                    <h2 className="text-base font-semibold opacity-50 flex-1 whitespace-nowrap">
                      Tony Matthew
                    </h2>
                    <div className="flex flex-col gap-1 items-end justify-end">
                      <h3 className="text-sm font-bold whitespace-nowrap opacity-50">
                        **** *** **** 1234
                      </h3>

                      <div>
                        <span className="opacity-50 text-[6.43px] leading-[6.43px] text-right flex items-center justify-end mb-1">
                          Month/Year
                        </span>
                        <div className="text-sm flex items-center gap-2">
                          <span className="opacity-50 text-[6.43px] leading-[6.43px]">
                            VALID <br />
                            THRU
                          </span>
                          <p className="text-[12.87px] leading-[15.69px]">
                            <span>03/20</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className=" block "> */}
                {/* <Image
                  src="/Logo/logo_main.svg"
                  alt="logo"
                  fill
                  className="object-contain absolute opacity-10 blur-sm pointer-events-none w-full h-full"
                /> */}
                <Image
                  src="/images/Noise.png"
                  alt="noise"
                  fill
                  className="object-cover absolute pointer-events-none w-full h-full"
                />
                <Image
                  src="/images/Planet Image.png"
                  alt="planet"
                  width={200}
                  height={200}
                  className="object-contain absolute pointer-events-none right-0 bottom-0 opacity-30 "
                />
                {/* </div> */}
              </div>

              <div>
                <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-2 mt-3">
                  <div className="px-4 py-3 text-white flex items-center justify-center gap-3 flex-col text-center">
                    <button className="flex items-center justify-center bg-[#363636] h-[72px] w-[72px] rounded-lg">
                      <AddCircle size={32} />
                    </button>
                    <div className="flex-1">
                      <h2 className="card-title text-xs  whitespace-nowrap">
                        Top Up
                      </h2>
                    </div>
                  </div>
                  <div className="px-4 py-3 text-white flex items-center justify-center gap-3 flex-col text-center">
                    <button className="flex items-center justify-center bg-[#363636] h-[72px] w-[72px] rounded-lg">
                      {/* <Image
                        src="/Logo/logo_main.svg"
                        alt="logo"
                        width={30}
                        height={30}
                        className="object-contain"
                      /> */}
                      <SendSquare size={32} />
                    </button>
                    <div className="flex-1">
                      <h2 className="card-title text-xs  whitespace-nowrap">
                        Withdraw
                      </h2>
                    </div>
                  </div>
                  <div className="px-4 py-3 text-white flex items-center justify-center gap-3 flex-col text-center">
                    <button className="flex items-center justify-center bg-[#363636] h-[72px] w-[72px] rounded-lg">
                      {/* <Image
                        src="/Logo/logo_main.svg"
                        alt="logo"
                        width={30}
                        height={30}
                        className="object-contain"
                      /> */}
                      <InfoCircle size={32} />
                    </button>
                    <div className="flex-1">
                      <h2 className="card-title text-xs  whitespace-nowrap">
                        View card info
                      </h2>
                    </div>
                  </div>
                  <div className="px-4 py-3 text-white flex items-center justify-center gap-3 flex-col text-center">
                    <button className="flex items-center justify-center bg-[#363636] h-[72px] w-[72px] rounded-lg">
                      {/* <Image
                        src="/Logo/logo_main.svg"
                        alt="logo"
                        width={30}
                        height={30}
                        className="object-contain"
                      /> */}
                      <SettingIcon size={32} />
                    </button>
                    <div className="flex-1">
                      <h2 className="card-title text-xs  whitespace-nowrap">
                        Manage
                      </h2>
                    </div>
                  </div>
                  {/* <button className="px-4 py-3 hover:bg-card-background text-white flex items-center justify-center gap-3 flex-col text-center">
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
                  </button> */}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 mt-5">
                <button className="px-4 py-5 rounded-lg  bg-card-background text-white flex items-center justify-between flex-wrap gap-3 flex-row text-left">
                  {/* <div className="mb-2">
                    <Image
                      src="/Logo/logo_main.svg"
                      alt="logo"
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  </div> */}
                  {/* <div className="space-y-1 flex-1"> */}
                  <h2 className="card-title text-sm">Today&apos;s Spending</h2>
                  <p className="text-sm">
                    <span className="font-bold text-xl">0.00</span> USD
                  </p>
                  {/* </div> */}
                </button>
                <button className="px-4 py-5 rounded-lg  bg-card-background text-white flex items-center justify-between flex-wrap gap-3 flex-row text-left">
                  {/* <div className="mb-2">
                    <Image
                      src="/Logo/logo_main.svg"
                      alt="logo"
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  </div> */}
                  {/* <div className="space-y-1 flex-1"> */}
                  <h2 className="card-title text-sm">Daily Limit</h2>
                  <p className="text-sm">
                    <span className="font-bold text-xl">0.00</span> USD
                  </p>
                  {/* </div> */}
                </button>
              </div>
            </div>
            <div className="w-full lg:w-8/12  rounded-2xl mt-8 lg:mt-0 space-y-4">
              {/* <div className="h-10 rounded-t-2xl bg-card-background"></div> */}
              <div className=" w-full rounded-2xl bg-card-background h-[500px] py-4 ">
                <Tabs position="relative" variant="unstyled">
                  <TabList className="px-4 space-x-6 text-[15px]">
                    <Tab
                      className=" text-white px-3 flex items-center"
                      _selected={{ color: '#FFCC29' }}
                    >
                      Transactions
                    </Tab>
                    <Tab
                      className=" text-white px-3 flex items-center"
                      _selected={{ color: '#FFCC29' }}
                    >
                      Recharge
                    </Tab>
                    <Tab
                      className=" text-white px-3 flex items-center"
                      _selected={{ color: '#FFCC29' }}
                    >
                      Withdraw
                    </Tab>
                  </TabList>

                  <TabIndicator
                    mt="-1.5px"
                    height="2px"
                    bg="#FFCC29"
                    borderRadius="1px"
                    // _selected={{ color: '#FFCC29'}}
                  />
                  <TabPanels>
                    <TabPanel>
                      <div className="w-full my-3 px-3 space-y-3 overflow-y-scroll  h-96 transaction_card fade-in">
                        {transacData.length > 0 ? (
                          // transacData.map((trans, index) => (
                          // <>
                          <TransactionsTable trans={trans} />
                        ) : (
                          // <TransactionCard key={index} trans={trans} />
                          // </>
                          // ))
                          <>
                            <EmptyState title={'No transactions yet'} />
                          </>
                        )}
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className="w-full my-3 px-3 space-y-3 overflow-y-scroll  h-96 transaction_card fade-in">
                        {cardRechargeData.length > 0 ? (
                          // cardRechargeData.map((trans, index) => (
                          // <>
                          <CardRechargesTable trans={trans} />
                        ) : (
                          // </>
                          // ))
                          <>
                            <EmptyState title={'No recharges yet'} />
                          </>
                        )}
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className="w-full my-3 px-3 space-y-3 overflow-y-scroll  h-96 transaction_card fade-in">
                        {cardWithdrawalData.length > 0 ? (
                          // cardWithdrawalData.map((trans, index) => (
                          // <>
                          <CardWithdrawalTable trans={trans} />
                        ) : (
                          // </>
                          // ))
                          <>
                            <EmptyState title={'No withdrawals yet'} />
                          </>
                        )}
                      </div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>

                {/* <div className="h-10 rounded-t-2xl text-white px-3 flex items-center">
                  Transactions
                </div> */}
              </div>
              <div className="w-full rounded-2xl bg-card-background py-4">
                <div className="h-10 rounded-t-2xl text-white px-3 flex items-center text-lg">
                  Common use cases
                </div>

                <div className="w-full my-3 px-3 space-y-3 h-full transaction_card">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3 h-full">
                    {UseCases.map((usecase, index) => (
                      <div
                        className="flex items-center justify-between gap-2"
                        key={index}
                      >
                        <div className="flex items-center justify-start md:justify-center flex-row flex-wrap gap-2">
                          <Image
                            src={`${usecase.logo}`}
                            alt={`${usecase.name}`}
                            width={24}
                            height={24}
                            className="object-contain pointer-events-none"
                          />
                          <h5 className="text-sm text-[#B4B1B1]">
                            {usecase.name}
                          </h5>
                        </div>

                        <span>
                          {usecase?.status == 1 ? (
                            <Check />
                          ) : (
                            <Add
                              size={20}
                              color="#FF8A7A"
                              className="rotate-45"
                            />
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
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

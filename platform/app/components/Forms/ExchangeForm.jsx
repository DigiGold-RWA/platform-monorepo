import React, { useState } from 'react';
import { CopyIcon, LoaderIcon } from '../IconComponent';
import { ArrowSwapHorizontal, ArrowSwapVertical } from 'iconsax-react';
import Image from 'next/image';

const ExchangeForm = () => {
  const [swapping, setSwapping] = useState(false);

  const createSwap = async (e) => {
    setSwapping(true);
    e.preventDefault();

    setTimeout(() => {
      setSwapping(false);
    }, 700);
  };
  return (
    <div>
      <form action="#" onSubmit={createSwap}>
        <div className="flex flex-col mb-2 gap-6">
          <div>
            <div className="relative rounded-lg flex-1  items-center grow flex h-12 w-full ">
              <div className="absolute inset-y-0 left-0 flex items-center px-3">
                <div className="flex items-center z-30">
                  <div className="text-white px-3  h-full py-2 rounded-[4px] flex items-center gap-2">
                    <Image
                      src="/Icons/Digigold.png"
                      alt="Digigold"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                    <span>DGold</span>
                  </div>
                </div>
              </div>
              <input
                type="number"
                name="address"
                id="address"
                className={`py-2 px-4 block h-12 w-full pl-28 sm:text-sm text-white bg-card-background border-0 focus:border-none rounded-lg focus:outline-none focus:ring-none placeholder-text-white text-right`}
                autoComplete="off"
                defaultValue={0.0}
              />
            </div>
            <p className="text-right text-white text-xs mt-1">
              Total balance: $2,450
            </p>
          </div>

          <div className="w-full mx-auto flex items-center justify-center">
            <button className="h-12 p-3 rounded-full bg-[#363636] ">
              <ArrowSwapVertical size={24} color="#fff" />
            </button>
          </div>

          <div>
            <div className="relative rounded-lg flex-1  items-center grow flex h-12 w-full ">
              <div className="absolute inset-y-0 left-0 flex items-center px-3">
                <div className="flex items-center z-30">
                  <div className="text-white px-3  h-full py-2 rounded-[4px] flex items-center gap-2">
                    <Image
                      src="/Icons/Tether(USDT).png"
                      alt="Tether(USDT)"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                    <span>USDT</span>
                  </div>
                </div>
              </div>
              <input
                type="number"
                name="address"
                id="address"
                className={`py-2 px-4 block h-12 w-full pl-28 sm:text-sm text-white bg-card-background border-0 focus:border-none rounded-lg focus:outline-none focus:ring-none placeholder-text-white text-right`}
                autoComplete="off"
                defaultValue={0.0}
              />
            </div>
            <p className="text-right text-white text-xs mt-1">
              Total balance: $2,450
            </p>
          </div>

          <div className="flex w-full mb-2">
            {swapping ? (
              <a className="disabled cursor-not-allowed h-[50px] py-2 px-4 w-full cursor-no-drop  bg-[#FFCC29]  focus:ring-offset-none text-[#484848] transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-none rounded-lg flex items-center justify-center ">
                <LoaderIcon className="animate-spin mr-1" /> Swapping
              </a>
            ) : (
              <button
                type="submit"
                className="h-[50px] py-2 px-4 w-full bg-[#FFCC29]  focus:ring-offset-none text-[#484848] transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-none rounded-lg flex items-center justify-center "
              >
                Swap
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExchangeForm;

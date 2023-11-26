'use client';
import Image from 'next/image';
import Link from 'next/link';
import VideoPlayer from './components/VideoPlayer';
import { Blogs, Services } from './lib/constants';
import Footer from './components/HomePageLayout/Footer';
import Navbar from './components/HomePageLayout/Navbar';
import PricingTable from './components/PricingTable';
import HomeChart from './components/Charts/HomeChart';
import { useState } from 'react';
import {
  ArrowRightIcon,
  ArrowRightIcon2,
  PlayCircle,
} from './components/IconComponent';

export default function Home() {
  const [currentRange, setCurrentRange] = useState('all');
  const DateRanges = [
    {
      title: 'Year to date',
      perc: '+10.00%',
      value: 'ytd',
      id: '1',
    },
    {
      title: '1 Year',
      perc: '+20.69%',
      value: '12m',
      id: '2',
    },
    {
      title: '5 years',
      perc: '+62.87%',
      value: '60m',
      id: '3',
    },

    {
      title: 'All',
      perc: '+9614.29%',
      value: 'all',
      id: '4',
    },
  ];
  return (
    <main>
      <Navbar />
      <section className="w-full grid grid-cols-1 md:grid-cols-1 min-h-[36.25rem] py-12">
        <div className="container px-4 relative">
          <div className="max-w-3xl w-full mx-auto gap-8 flex flex-col items-center justify-center h-full text-center text-white">
            <h1 className="text-5xl font-bold leading-snug">
              Fully Backed <span className="text-[#FFCC29]">1:1</span> Tokenized
              Gold
            </h1>
            <p>
              Experience the future of Gold ownership. Securely own as little as
              1g ($64)Tokenized Gold backed by 99.9% of pure Gold vaulted in
              Dubai without any associated risk.
            </p>

            <div className="w-full gap-3 lg:gap-8 flex flex-wrap items-center justify-center">
              <Link
                href=""
                className=" border border-[#FFCC29] text-[#FFCC29] px-3 py-2 rounded-lg w-full md:w-48 h-[3rem] text-center text-sm flex items-center justify-center"
              >
                <span className="mr-2">
                  <PlayCircle />
                </span>
                How it works
              </Link>

              <Link
                href=""
                className="bg-[#FFCC29] border border-[#FFCC29] text-[#484848] px-3 py-2 rounded-lg w-full md:w-48 h-[3rem] text-center text-sm flex items-center justify-center"
              >
                Buy Tokenized gold
              </Link>
            </div>
          </div>

          <Image
            src="/images/bq(1).svg"
            alt="bg"
            width={500}
            height={450}
            // fill
            className="object-contain absolute  pointer-events-none right-0 bottom-0"
          />
          <Image
            src="/images/bq(2).svg"
            alt="bg"
            width={500}
            height={250}
            // fill
            className="object-contain absolute  pointer-events-none left-0 top-0"
          />
        </div>
      </section>

      <section className="px-4 relative">
        <div
          className="container mx-auto max-w-5xl px-4 py-8 rounded-[24px] bg-card-background relative z-10"
          style={{ backdropFilter: 'blur(10px)' }}
        >
          <div className=" w-full h-full flex items-center justify-center text-white max-w-2xl mx-auto ">
            <div className="card p-[2rem] text-center space-y-5">
              <p className="text-base">
                Our tokenized gold is minted s $DGoldtoken. With 1 $DGold
                representing 1g of gold
              </p>
              <div className="items-center justify-center flex flex-col">
                <h1 className="text-6xl font-bold leading-snug text-[#FFCC29]">
                  $100,000 <span>USD</span>
                </h1>

                <p className="text-white text-base mt-2">Total $DGold issued</p>
              </div>
            </div>
          </div>
        </div>
        <Image
          src="/images/Group 48.svg"
          alt="bg"
          width={250}
          height={450}
          // fill
          className="object-contain absolute  pointer-events-none right-40 -bottom-20 opacity-60 -z-0"
        />
      </section>

      <section className=" pt-[80px] lg:pt-[100px] pb-[50px] lg:pb-[50px] h-full">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col justify-center items-center w-full mb-4">
            <h1 className="text-center text-4xl font-bold leading-snug text-white">
              Gold price Performance USD
            </h1>
          </div>
          <div className="bg-card-background p-2 md:p-5 rounded-2xl">
            <div className="p-4 lg:p-8 ">
              <div className="w-full flex items-start justify-between flex-col md:gap-0 gap-2 text-white pb-3">
                <h4 className="text-xl pb-3">Gold ($US / OZ)</h4>
              </div>

              <div className="max-h-[500px] h-[300px] lg:h-[450px] home__chart">
                <HomeChart range={currentRange} key={currentRange} />
              </div>

              <div className="flex items-center justify-between flex-row gap-3 w-full mt-4">
                {DateRanges.map((range, index) => (
                  <button
                    key={index}
                    className={`flex flex-col justify-center items-center text-xs py-2 px-3 w-auto lg:w-1/2 rounded-2xl text-white ${
                      range.value == currentRange ? 'bg-[#505050]' : ''
                    } `}
                    onClick={(e) => {
                      setCurrentRange(range.value);
                    }}
                  >
                    <span className="text-xs md:text-lg">{range.title}</span>
                    <span className="text-[9px] md:text-sm text-[#8BFFC9]">
                      {range.perc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className=" pt-[80px] lg:pt-[100px] pb-[50px] lg:pb-[50px] min-h-[300px] md:min-h-[400px] lg:min-h-[510px]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col justify-center items-center w-full">
            <h1 className="text-center text-4xl font-bold leading-snug text-white">
              How it works
            </h1>
          </div>
          <div className="relative pt-5 pb-10">
            <div className="relative items-center h-full w-full">
              <VideoPlayer />
            </div>
          </div>
        </div>
      </section>

      <section className=" pt-[80px] lg:pt-[100px] pb-[60px] lg:pb-[80px]">
        <div className="container max-w-7xl mx-auto px-4 lg:px-0 ">
          <div className="flex flex-col justify-center items-center w-full max-w-4xl mx-auto mb-3 pb-2">
            <h1 className="text-center text-4xl font-bold leading-snug text-white">
              Why stress when you can move your gold around in your wallet
            </h1>
          </div>
          <div className="relative pt-5 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Services.map((service, index) => (
                // <DistCard key={index} distillery={distillery} />
                <div
                  className="card gap-[2rem] p-[2rem] rounded-2xl  bg-card-background text-white"
                  key={index}
                >
                  <div className="flex items-start justify-start gap-3">
                    <div className="">
                      <Image
                        src="/Logo/logo_main.svg"
                        alt="logo"
                        width={50}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h2 className="card-title text-xl font-semibold">
                        {service.title}
                      </h2>
                      <p className="text-base">{service.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-[60px] lg:pt-[80px] pb-[80px] lg:pb-[120px] relative">
        <div className="container mx-auto max-w-6xl px-4 z-10">
          <div className="flex flex-col justify-center items-center w-full max-w-4xl mx-auto mb-3 pb-8">
            <h1 className="text-center text-4xl font-bold leading-snug text-white">
              Why choose $DGold?
            </h1>
          </div>
          <div
            className="rounded-[24px] bg-card-background z-10"
            style={{ backdropFilter: 'blur(10px)' }}
          >
            <div className=" w-full h-full text-white z-10">
              <PricingTable />
            </div>
          </div>
        </div>
        <Image
          src="/images/Group 48.svg"
          alt="bg"
          width={250}
          height={450}
          // fill
          className="object-contain absolute  pointer-events-none left-[4rem] bottom-0 opacity-60 -z-0"
        />
      </section>

      <section className="w-full flex justify-center item-center pt-[80px] lg:pt-[120px] pb-[80px] lg:pb-[120px] relative">
        <div className="container rounded-2xl relative">
          <div className=" py-12">
            <div className="w-full flex flex-col justify-center items-center mb-3 pb-8">
              <h2 className="text-[38px] text-white ">Our Valued Partners</h2>
            </div>

            <div className=" max-w-2xl" style={{ margin: '0 auto' }}>
              <div className="flex text-center justify-center items-center gap-6 flex-wrap">
                <Image
                  src="/images/partners/klaytn.svg"
                  alt="Klaytn"
                  width={200}
                  height={200}
                  className="object-contain"
                />

                <Image
                  src="/images/partners/tigerresearch.png"
                  alt="tigerresearch"
                  width={200}
                  height={250}
                  className="object-contain"
                />
                {/* <Image
                  src="/images/partners/dmcc1.png"
                  alt="dmcc"
                  width={200}
                  height={200}
                  className="object-contain"
                /> */}
                <Image
                  src="/images/partners/chainanalysis1.png"
                  alt="chainanalysis1"
                  width={150}
                  height={150}
                  className="object-contain"
                />

                <Image
                  src="/images/partners/alchemy.png"
                  alt="alchemy"
                  width={200}
                  height={200}
                  className="object-contain"
                />
                <Image
                  src="/images/partners/digioracle.svg"
                  alt="Digioracle"
                  width={200}
                  height={200}
                  className="object-contain"
                />
                <Image
                  src="/images/partners/shufti-logo.png"
                  alt="Shuftipro"
                  width={250}
                  height={200}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        <Image
          src="/images/bq(1).svg"
          alt="bg"
          width={500}
          height={450}
          // fill
          className="object-contain absolute  pointer-events-none right-0 bottom-0"
        />
        <Image
          src="/images/bq(2).svg"
          alt="bg"
          width={500}
          height={250}
          // fill
          className="object-contain absolute  pointer-events-none left-0 top-0"
        />
      </section>

      <section className="w-full pt-[50px] lg:pt-[50px] pb-[80px] lg:pb-[120px]">
        <div className="container px-3">
          <div className="flex flex-col justify-center items-center">
            <div className="w-full flex flex-col justify-center items-center mb-3 pb-8">
              <h2 className="text-[38px] text-white ">News & Articles</h2>
            </div>

            <div className=" w-full ">
              <div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-5 pb-8">
                  {Blogs.map((blogs, index) => (
                    <div className="card grid p-2 rounded-[24px]" key={index}>
                      <div className="w-full h-72 md:h-96 relative overflow-hidden news__card block object-cover rounded-[24px] ">
                        <Image
                          src={blogs.image}
                          alt={blogs.alt}
                          fill
                          className="rounded-[24px] w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h2
                          className="font-semibold text-[22px] text-white"
                          style={{
                            margin: '20px 0',
                          }}
                        >
                          {blogs.name}
                        </h2>

                        <div className=" flex items-center justify-end text-[#FFCC29]">
                          <Link
                            href={'/'}
                            className="inline-flex items-center gap-3"
                          >
                            Read More <ArrowRightIcon2 />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className=" flex items-center justify-center mt-5">
                  <Link
                    href={'/'}
                    className=" border border-[#FFCC29] text-[#FFCC29] px-3 py-2 rounded-lg w-full md:w-48 h-[3rem] text-center text-sm flex items-center justify-center"
                  >
                    All articles
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

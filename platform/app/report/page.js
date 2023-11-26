import React from 'react';
import Navbar from '../components/HomePageLayout/Navbar';
import Footer from '../components/HomePageLayout/Footer';
import Link from 'next/link';
import PricingTable from '../components/PricingTable';
import Image from 'next/image';
import { Calendar2 } from 'iconsax-react';
import { CalendarIcon } from '../components/IconComponent';

const Report = () => {
  return (
    <main>
      <Navbar />
      <section className="w-full grid grid-cols-1 md:grid-cols-1 min-h-[36.25rem] py-12 relative">
        <div className="container px-4 relative">
          <div className="max-w-3xl w-full mx-auto gap-8 flex flex-col items-center justify-center h-full text-center text-white">
            <h1 className="text-5xl font-bold leading-snug">
              Staying transparent with our reserve
            </h1>
            <p>
              Own tokenized gold backed by real world gold securely vaulted in
              Dubai with as low as $32 (0.5g). You own 99.9% gold without the
              risk.
            </p>

            <div className="w-full gap-3 lg:gap-8 flex flex-wrap items-center justify-center">
              <Link
                href=""
                className="bg-[#FFCC29] border border-[#FFCC29] text-[#484848] px-3 py-2 rounded-lg w-full md:w-48 h-[3rem] text-center text-sm flex items-center justify-center"
              >
                Reserve audits
              </Link>
            </div>
          </div>
        </div>
        <div className='h-32 w-full flex items-center justify-center -mt-20'>
          <Image
            src="/images/bq(3).svg"
            alt="bg"
            width={200}
            height={250}
            // fill 
            className="object-center object-contain  pointer-events-none max-w-3xl mx-auto w-full -z-0  "
          />
        </div>
        
      </section>

      <section className=" pt-[80px] lg:pt-[100px] pb-[60px] lg:pb-[80px]">
        <div className="container max-w-7xl mx-auto px-4 lg:px-0 ">
          <div className="relative pt-5 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
              {/* {CalendarData.map((cal, index) => ( */}
                {/* <> */}
                  <div className="card gap-[2rem] p-[2rem] rounded-2xl  bg-card-background text-white">
                    <div className="flex items-start justify-start gap-3">
                      <div className="mt-1">
                        <CalendarIcon variant="TwoTone" size={22} />
                      </div>
                      <div className="space-y-2 flex-1">
                        <h2 className="card-title text-xl font-semibold">2023</h2>
                        <div className='flex items-center justify-start md:justify-between gap-2 flex-wrap text-base text-[#FFCC29]'>
                          <p className="">Jan</p>
                          <p className="">Feb</p>
                          <p className="">Mar</p>
                          <p className="">Apr</p>
                          <p className="">May</p>
                          <p className="">Jun</p>
                          <p className="">Aug</p>
                          <p className="">Sep</p>
                          <p className="">Oct</p>
                          <p className="">Nov</p>
                          <p className="">Dec</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card gap-[2rem] p-[2rem] rounded-2xl  bg-card-background text-white">
                    <div className="flex items-start justify-start gap-3">
                      <div className="mt-1">
                        <CalendarIcon variant="TwoTone" size={22} />
                      </div>
                      <div className="space-y-2 flex-1">
                        <h2 className="card-title text-xl font-semibold">2022</h2>
                        <div className='flex items-center justify-start md:justify-between gap-2 flex-wrap text-base text-[#FFCC29]'>
                          <p className="">Jan</p>
                          <p className="">Feb</p>
                          <p className="">Mar</p>
                          <p className="">Apr</p>
                          <p className="">May</p>
                          <p className="">Jun</p>
                          <p className="">Aug</p>
                          <p className="">Sep</p>
                          <p className="">Oct</p>
                          <p className="">Nov</p>
                          <p className="">Dec</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card gap-[2rem] p-[2rem] rounded-2xl  bg-card-background text-white">
                    <div className="flex items-start justify-start gap-3">
                      <div className="mt-1">
                        <CalendarIcon variant="TwoTone" size={22} />
                      </div>
                      <div className="space-y-2 flex-1">
                        <h2 className="card-title text-xl font-semibold">2021</h2>
                        <div className='flex items-center justify-start md:justify-between gap-2 flex-wrap text-base text-[#FFCC29]'>
                          <p className="">Jan</p>
                          <p className="">Feb</p>
                          <p className="">Mar</p>
                          <p className="">Apr</p>
                          <p className="">May</p>
                          <p className="">Jun</p>
                          <p className="">Aug</p>
                          <p className="">Sep</p>
                          <p className="">Oct</p>
                          <p className="">Nov</p>
                          <p className="">Dec</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card gap-[2rem] p-[2rem] rounded-2xl  bg-card-background text-white">
                    <div className="flex items-start justify-start gap-3">
                      <div className="mt-1">
                        <CalendarIcon size={22}/>
                      </div>
                      <div className="space-y-2 flex-1">
                        <h2 className="card-title text-xl font-semibold">2020</h2>
                        <div className='flex items-center justify-start md:justify-between gap-2 flex-wrap text-base text-[#FFCC29]'>
                          <p className="">Jan</p>
                          <p className="">Feb</p>
                          <p className="">Mar</p>
                          <p className="">Apr</p>
                          <p className="">May</p>
                          <p className="">Jun</p>
                          <p className="">Aug</p>
                          <p className="">Sep</p>
                          <p className="">Oct</p>
                          <p className="">Nov</p>
                          <p className="">Dec</p>
                        </div>
                      </div>
                    </div>
                  </div> 
                {/* </> */}
               {/* ))}  */}
              
            </div>
          </div>
        </div>
      </section>

      <section className=" pt-[80px] lg:pt-[100px] pb-[80px] lg:pb-[120px]">
        <div className="container mx-auto max-w-6xl ">
          <div className="flex flex-col justify-center items-center w-full max-w-4xl mx-auto mb-3 pb-8">
            <h1 className="text-center text-4xl font-bold leading-snug text-white">
              Why choose $DGold?
            </h1>
          </div>
          <div
            className="rounded-[24px] bg-card-background "
            style={{ backdropFilter: 'blur(10px)' }}
          >
            <div className=" w-full h-full text-white">
              <PricingTable />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Report;

import React from 'react';
import Navbar from '../components/HomePageLayout/Navbar';
import Footer from '../components/HomePageLayout/Footer';
import Link from 'next/link';
import PricingTable from '../components/PricingTable';

const Report = () => {
  return (
    <main>
      <Navbar />
      <section className="w-full grid grid-cols-1 md:grid-cols-1 min-h-[36.25rem] py-12">
        <div className="container px-4">
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
      </section>

      <section className="pt-[80px] lg:pt-[120px] pb-[80px] lg:pb-[120px]">
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

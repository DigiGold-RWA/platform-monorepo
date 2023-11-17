'use client';
import Image from 'next/image';
import Link from 'next/link';
import VideoPlayer from './components/VideoPlayer';
import { Blogs, Services } from './lib/constants';
import Footer from './components/HomePageLayout/Footer';
import Navbar from './components/HomePageLayout/Navbar';
import PricingTable from './components/PricingTable';

export default function Home() {
  return (
    <main>
      <Navbar />
      <section className="w-full grid grid-cols-1 md:grid-cols-1 min-h-[36.25rem] py-12">
        <div className="container px-4">
          <div className="max-w-3xl w-full mx-auto gap-8 flex flex-col items-center justify-center h-full text-center text-white">
            <h1 className="text-5xl font-bold leading-snug">
              Fully Backed <span>1:1</span> Tokenized Gold
            </h1>
            <p>
              Experience the future of Gold ownership. Securely own as little as
              0.5g ($32)Tokenized Gold backed by 99.9% of pure Gold vaulted in
              Dubai without any associated risk.
            </p>

            <div className="w-full gap-3 lg:gap-8 flex flex-wrap items-center justify-center">
              <Link
                href=""
                className=" border border-[#FFCC29] text-[#FFCC29] px-3 py-2 rounded-lg w-full md:w-48 h-[3rem] text-center text-sm flex items-center justify-center"
              >
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
        </div>
      </section>

      <section className="px-4">
        <div
          className="container mx-auto max-w-5xl px-4 py-8 rounded-[24px] bg-card-background "
          style={{ backdropFilter: 'blur(10px)' }}
        >
          <div className=" w-full h-full flex items-center justify-center text-white max-w-2xl mx-auto">
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
      </section>

      <section id="how-it-works" className=' pt-[80px] lg:pt-[100px] pb-[50px] lg:pb-[50px]'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col justify-center items-center w-full">
            <h1 className="text-center text-4xl font-bold leading-snug text-white">
              How it works
            </h1>
          </div>
          <div className="relative pt-10 pb-10">
            <div className="relative items-center h-[300px] md:h-[500px] lg:h-[610px] w-full">
              <VideoPlayer />
            </div>
          </div>
        </div>
      </section>

      <section className=" pt-[80px] lg:pt-[100px] pb-[80px] lg:pb-[100px]">
        <div className="container max-w-7xl mx-auto px-4 lg:px-0 ">
          <div className="flex flex-col justify-center items-center w-full max-w-4xl mx-auto mb-3 pb-8">
            <h1 className="text-center text-4xl font-bold leading-snug text-white">
              Why stress when you can move your gold around in your wallet
            </h1>
          </div>
          <div className="relative pt-10 pb-10">
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
                      <h2 className="card-title text-lg font-semibold">
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

      <section className="w-full flex justify-center item-center pt-[80px] lg:pt-[120px] pb-[80px] lg:pb-[120px]">
        <div className="container rounded-2xl ">
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
                  height={200}
                  className="object-contain"
                />
                <Image
                  src="/images/partners/dmcc1.png"
                  alt="dmcc"
                  width={200}
                  height={200}
                  className="object-contain"
                />
                <Image
                  src="/images/partners/chainanalysis1.png"
                  alt="chainanalysis1"
                  width={150}
                  height={150}
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
                          <Link href={'/'}>Read More</Link>
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

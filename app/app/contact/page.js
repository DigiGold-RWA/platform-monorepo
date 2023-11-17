import React from 'react';
import Navbar from '../components/HomePageLayout/Navbar';
import Footer from '../components/HomePageLayout/Footer';
import CardComponent from '../components/PageLayout/CardComponent';
import ContactForm from '../components/Forms/ContactForm';
import { MapIcon, TelegramIcon, TwitterIcon, YoutubeIcon } from '../components/IconComponent';
import Image from 'next/image';

const Contact = () => {
  return (
    <main>
      <Navbar />

      <section className="pt-[80px] lg:pt-[120px] pb-[80px] lg:pb-[120px]">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card-background p-5 rounded-2xl">
              <div className="p-4 lg:p-8">
                <div className="text-white mb-5 lg:mb-8 space-y-2">
                  <h3 className="text-4xl">Get in touch</h3>
                  <p className="text-xl">
                    Our team would love to hear from you.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>

            <div className="bg-card-background p-5 rounded-2xl">
              <div className="p-4 lg:p-8">
                <div className="text-white mb-5 lg:mb-8 space-y-2">
                  <h3 className="text-4xl">Level up</h3>
                  <p className="text-xl">
                    You can reach us at{' '}
                    <a href="mailto:hr@digigold.com" className="text-[#FFCC29]">
                      hr@digigold.com
                    </a>
                  </p>
                </div>
                <div className='h-52 lg:h-96 w-full block relative my-4'>
                    <Image src={'/images/map.png'} alt='map' fill className='object-cover' />
                </div>
                <div>
                  <div className="flex items-start justify-start gap-3">
                    <MapIcon />
                    <div className="text-white">
                      <h5 className="text-xl">Office</h5>
                      <p className="text-base text-[#FFF2C8]">
                        Come say hello at our office HQ.
                      </p>

                      <p className="text-base mt-5">
                        Floor 15, office 1508, DMCC Towers, Dubai, UAE
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-6 mt-8">
                    <TelegramIcon className={'w-6 h-6'} />
                    {/* <InstagramIcon className={"w-6 h-6"} /> */}

                    {/* <LinkedInIcon className={"w-6 h-6"} /> */}

                    <YoutubeIcon className={'w-6 h-6'} />

                    <TwitterIcon className={'w-6 h-6'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Contact;

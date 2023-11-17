import Link from 'next/link';
import {
  TwitterIcon,
  YoutubeIcon,
  LinkedInIcon,
  TelegramIcon,
} from '../IconComponent';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#212120] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col ">
          <div className="flex-1">
            <div className="flex items-center  justify-between mb-6 flex-wrap">
              <div className="w-full md:w-1/4 flex items-center mb-4 md:mb-0 ">
                <Image
                  src="/Logo/logo_main.svg"
                  alt="DigiGold Logo"
                  width={60}
                  height={150}
                />
              </div>

              <div className="flex justify-between w-full md:w-3/4 flex-wrap gap-3">
                <ul className="flex w-full lg:text-base text-sm md:w-3/4 space-x-5 flex-wrap mt-0 justify-start md:justify-end items-center">
                  <li>
                    <a href="mailto:info@digicask.finance">Contact</a>
                  </li>
                  <li>
                    <a href="#">Fees structure</a>
                  </li>
                  <li>
                    <a href="#">FAQs</a>
                  </li>
                  <li>
                    <a href="#">Whitepaper</a>
                  </li>
                </ul>
                <div className="flex space-x-6">
                  <TelegramIcon className={'w-6 h-6'} />
                  {/* <InstagramIcon className={"w-6 h-6"} /> */}

                  {/* <LinkedInIcon className={"w-6 h-6"} /> */}

                  <YoutubeIcon className={'w-6 h-6'} />

                  <TwitterIcon className={'w-6 h-6'} />
                </div>
              </div>
            </div>
          </div>
          <div
            className="text-xs"
            style={{
              borderTop: '1px solid #737272',
              paddingTop: '1.5rem',
              lineHeight: '2',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            <p>
              1. The DigiGold Token, which is sometimes referred to as &ldquo;digital
              gold&rdquo; on this website, is an electronic deed of title for physical
              gold that is recorded as a digital token on the Ethereum or
              Stellar blockchains. A DigiGold Token&apos;s value and gold prices are
              subject to fluctuations due to a variety of reasons, such as
              supply and demand, the state of the world economy, and other
              political, financial, or social events.
            </p>
            <p>
              2. To receive physical delivery of the gold, you will need to
              provide an appropriate account or address, and the delivery will
              incur applicable fees, taxes, and shipping costs.
            </p>
            <p>
              Please be aware that investing in cryptocurrency carries a
              significant level of risk, including the possibility of losing
              money. Cryptocurrency assets are regarded as speculative.
              Investing in Digital Funds comes with risks, such as the potential
              for principle loss.
            </p>
            <p>
              The information offered is not meant to be construed as an offer
              or solicitation to buy any security, financial instrument, digital
              asset, service, or advice in any country, nor is it intended to be
              a recommendation in connection with any of these things. Possible
              Products and Services, together with the appropriate launch
              schedule and related costs, are in development, will necessitate
              partnerships with other parties (such as banks), and may never be
              made accessible, among other reasons, including regulatory
              concerns. DigiGold disclaims all responsibility to update any
              information supplied, and any programmes linked above are subject
              to change without notice.
            </p>
            <p>
              It is explicitly stated that DigiGold disclaims all liability
              resulting from your use of this website or from your reliance on
              the information here. DigiGold therefore disclaims any warranties,
              whether express or implied, to the maximum extent authorised by
              relevant law. By accessing this website, you accept the terms
              stated in our privacy policy and agree to this disclaimer.
            </p>
          </div>
          <div className="relative flex pt-[6rem] justify-between flex-wrap">
            <p
              style={{
                color: '#878787',
                fontSize: '1rem',
                lineHeight: '2',
              }}
            >
              &copy; {new Date().getFullYear()} DigiGold. All rights reserved
            </p>
            <div className="flex space-x-2 flex-wrap">
              <Link
                href={'/'}
                style={{
                  color: '#878787',
                  fontSize: '1rem',
                  lineHeight: '2',
                }}
              >
                Disclosures
              </Link>
              <Link
                href={'/'}
                style={{
                  color: '#878787',
                  fontSize: '1rem',
                  lineHeight: '2',
                }}
              >
                Cookie Policy
              </Link>
              <Link
                href={'/'}
                style={{
                  color: '#878787',
                  fontSize: '1rem',
                  lineHeight: '2',
                }}
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

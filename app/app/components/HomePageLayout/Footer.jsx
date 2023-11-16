import { ImageBase, Paragraph, ViewMore } from "../Button/Button";
import {
    TwitterIcon,
    YoutubeIcon,
    LinkedInIcon,
    TelegramIcon,
} from "../IconComponent";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="bg-[#002525] text-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col ">
                    <div className="flex-1">
                        <div className="flex items-center  justify-between mb-6 flex-wrap">
                            <div className="w-full md:w-1/4 flex items-center mb-4 md:mb-0 ">
                                <Image
                                    src="/images/Logofooter.png"
                                    alt="decoration barrel"
                                    width={200}
                                    height={150}
                                />
                            </div>

                            <div className="flex justify-between w-full md:w-3/4 flex-wrap gap-3">
                                <ul className="flex w-full lg:text-base text-sm md:w-3/4 space-x-5 flex-wrap mt-0 justify-start md:justify-end items-center">
                                    <li>
                                        <a href="mailto:info@digicask.finance">
                                            Contact
                                        </a>
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
                                    <TelegramIcon className={"w-6 h-6"} />
                                    {/* <InstagramIcon className={"w-6 h-6"} /> */}

                                    {/* <LinkedInIcon className={"w-6 h-6"} /> */}

                                    <YoutubeIcon className={"w-6 h-6"} />

                                    <TwitterIcon className={"w-6 h-6"} />
                                </div>
                            </div>
                        </div>
                        {/* <div className="">
             
              <p>Paragraph 1</p>
              <p>Paragraph 2</p>
              <p>Paragraph 3</p>
              <p>Paragraph 4</p>
            </div> */}
                    </div>
                    <div
                        className="text-xs"
                        style={{
                            borderTop: "1px solid #737272",
                            paddingTop: "1.5rem",
                            lineHeight: "2",
                            display: "flex",
                            flexDirection: "column",
                            gap: "2rem",
                        }}
                    >
                        <Paragraph
                            text={
                                "This site is and the product advertised DigiCask is owned and operated by Fend Group LTD, which is not a registered broker-dealer or investment advisor. Fend Group LTD. does not give investment advice, endorsement, analysis or recommendations with respect to any securities. Nothing on this website should be construed as an offer to sell, solicitation of an offer to buy or a recommendation in respect of a security. You are solely responsible for determining whether any investment, investment strategy or related transaction is appropriate for you based on your personal investment objectives, financial circumstances and risk tolerance. You should consult with licensed legal professionals and investment advisors for any legal, tax, insurance or investment advice. "
                            }
                        />
                        <Paragraph
                            text={
                                "Fend Group LTD. does not guarantee any investment performance, outcome or return of capital for any investment opportunity posted on this site. By accessing this site and any pages thereof, you agree to be bound by the Terms of Service and Privacy Policy. All investments involve risk and may result in partial or total loss. By accessing this site, investors understand and acknowledge 1) that investing in whisky cask, like investing in other fields, is risky and there can be loss of funds in the case of any unforeseeable situation; 2) that the whisky investment industry might have its ups and downs; 3) that the whisky cask you invest in might not result in a positive cash flow or perform as you expected; and 4) that the value of any whisky cask you invest in may decline at any time and the future property value is unpredictable. Before making an investment decision, prospective investors are advised to review all available information and consult with their tax and legal advisors. Fend Group LTD does not provide investment advice or recommendations regarding any offering posted on this website."
                            }
                        />
                        <Paragraph
                            text={
                                "Any investment-related information contained herein has been secured from sources that Fend Group LTD believes to be reliable, but we make no representations or warranties as to the accuracy or completeness of such information and accept no liability therefore. Hyperlinks to third-party sites, or reproduction of third-party articles, do not constitute an approval or endorsement by Fend Group LTD of the linked or reproduced content."
                            }
                        />
                    </div>
                    <div className="relative flex pt-[6rem] justify-between flex-wrap">
                        <p
                            style={{
                                color: "#878787",
                                fontSize: "1rem",
                                lineHeight: "2",
                            }}
                        >
                            &copy; {new Date().getFullYear()} DigiCask. All
                            rights reserved
                        </p>
                        <div className="flex space-x-2 flex-wrap">
                            <ViewMore
                                address={""}
                                text={"Disclosures"}
                                style={{
                                    color: "#878787",
                                    fontSize: "1rem",
                                    lineHeight: "2",
                                }}
                            />
                            <ViewMore
                                address={""}
                                text={"Cookie Policy"}
                                style={{
                                    color: "#878787",
                                    fontSize: "1rem",
                                    lineHeight: "2",
                                }}
                            />
                            <ViewMore
                                address={""}
                                text={"Privacy Policy"}
                                style={{
                                    color: "#878787",
                                    fontSize: "1rem",
                                    lineHeight: "2",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

'use client';
import { useDisclosure, Button } from '@chakra-ui/react';
import CardComponent from '@/app/components/PageLayout/CardComponent';
import MainComponent from '@/app/components/PageLayout/MainComponent';
import { PageTitle } from '@/app/components/PageLayout/PageTitle';
import React, { useRef, useState, useEffect } from 'react';
import InvestmentsTable from '@/app/components/DataTable/InvestmentsTable';
import PortfolioChart from '@/app/components/Charts/PortfolioChart';
import PlansTable from '@/app/components/PlansTable';
// import { investmentData } from "@/public/data";
import axios from 'axios';
import Image from 'next/image';

const Exchange = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [plans, setPlans] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [usdcBalance, setUsdcBalance] = useState(0);
  const [dcaskBalance, setDcaskBalance] = useState(0);

  const getAssets = async () => {
    const hostUrl = process.env.NEXT_PUBLIC_AUTH_URL;
    const res = await axios.get(`${hostUrl}/api/customer/asset`, {
      withCredentials: true,
    });

    return res?.data?.data;
  };

  const getInvestments = async () => {
    const hostUrl = process.env.NEXT_PUBLIC_AUTH_URL;
    const res = await axios.get(`${hostUrl}/api/customer/investments`, {
      withCredentials: true,
    });

    return res?.data?.data;
  };

  const getPlans = async () => {
    const hostUrl = process.env.NEXT_PUBLIC_AUTH_URL;
    const res = await axios.get(`${hostUrl}/api/plans`, {
      withCredentials: true,
    });

    return res?.data?.data;
  };

  useEffect(() => {
    getPlans().then((plans) => {
      setPlans(plans);
    });
    getAssets().then((balances) => {
      if (balances) {
        setUsdcBalance(balances.usdc);
        setDcaskBalance(balances.dcask);
      }
    });
    getInvestments().then((investments) => {
      console.log(investments);
      setInvestments(investments);
    });
  }, []);

  return (
    <div>
      <div className="mb-6">
        <PageTitle title={'Exchange'} />
      </div>

      <div className="flex w-full gap-5 md:flex-nowrap flex-wrap">
        <div className="w-full md:w-5/12">
          <div className="rounded-lg bg-card-background">
            <div>
              <h3 className="text-lg font-medium text-left mb-4 text-[#4F4F4F]">
                Exchange your assets
              </h3>
            </div>
          </div>
        </div>
        <div className="w-full md:w-7/12">
          <div>
            <Image
              src="/images/graph.png"
              alt="No Transaction"
              height={200}
              width={100}
              layout="responsive"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;

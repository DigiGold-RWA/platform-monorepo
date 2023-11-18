'use client';
import { useDisclosure, Button } from '@chakra-ui/react';
import CardComponent from '@/app/components/PageLayout/CardComponent';
import MainComponent from '@/app/components/PageLayout/MainComponent';
import { PageTitle } from '@/app/components/PageLayout/PageTitle';
import React, { useRef, useState, useEffect } from 'react';
// import { investmentData } from "@/public/data";
import axios from 'axios';
import Image from 'next/image';
import ExchangeForm from '@/app/components/Forms/ExchangeForm';

const Exchange = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [plans, setPlans] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [usdcBalance, setUsdcBalance] = useState(0);
  const [dcaskBalance, setDcaskBalance] = useState(0);

  return (
    <div>
      <div className="mb-6">
        <PageTitle title={'Exchange'} />
      </div>

      <div className="flex w-full gap-5 md:flex-nowrap flex-wrap">
        <div className="w-full md:w-5/12">
          <div className="bg-card-background p-5 rounded-2xl">
            <div className="p-4 lg:p-8">
              <div className="text-white mb-5">
                <h3 className="text-lg">Exchange your assets</h3>
              </div>
              <ExchangeForm />
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

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
import ExchangeChart from '@/app/components/Charts/ExchangeChart';

const Exchange = () => {

  return (
    <div>
      <div className="mb-6">
        <PageTitle title={'Exchange'} />
      </div>

      <div className="flex w-full gap-5 md:flex-nowrap flex-wrap">
        <div className="w-full md:w-4/12">
          <div className="bg-card-background p-5 rounded-2xl">
            <div className="p-4 lg:p-8">
              <div className="text-white mb-5">
                <h3 className="text-lg">Exchange your assets</h3>
              </div>
              <ExchangeForm />
            </div>
          </div>
        </div>
        <div className="w-full md:w-8/12">
          <div className='h-[500px] w-full rounded-2xl bg-card-background'>
            <ExchangeChart/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;

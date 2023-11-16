'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ApexCharts = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

export default function PortfolioChart({ data }) {
  const Total = '$' + 12000;
  const options = {
    series: [44, 55, 41, 17],
    colors: ['#248C8C', '#56B1B1', '#83DBDB', '#EAFCFC'],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
        customScale: 1,
        donut: {
          //   labels: {
          //     show: true,
          //     label: '',
          //     total: {
          //       show: true,
          //       label: '',
          //     //   formatter: () => 'Total Balance',
          //     },
          //   },
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '22px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: undefined,
              offsetY: -10,
              formatter: function (val) {
                return val;
              },
            },
            value: {
              show: true,
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              color: undefined,
              offsetY: 16,
              formatter: function (val) {
                return val;
              },
            },
            total: {
              show: true,
              showAlways: true,
              label: `${Total}`,
              fontSize: '22px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: '#373d3f',
              //   formatter: function (val) {
              //     return val;
              //   },
              formatter: () => 'Total Balance',
            },
          },
        },
      },
    },
    // options: {
    //   chart: {
    //     type: 'donut',
    //   },
    //   responsive: [
    //     {
    //       breakpoint: 480,
    //       options: {
    //         chart: {
    //           width: 200,
    //         },
    //         legend: {
    //           position: 'bottom',
    //         },
    //       },
    //     },
    //   ],
    // },
    // plotOptions: {
    //   bar: {
    //     horizontal: false,
    //   },
    // },
    // xaxis: {
    //   type: 'category',
    //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], // Months
    // },
    // fill: {
    //   opacity: 1, // Set opacity to 1 for solid color
    // },
    // colors: ['#6941C6', '#9E77ED', '#D6BBFB'],
    // legend: {
    //   position: 'top',
    // },
  };

  //   const series = [
  //     {
  //       name: 'USDC',
  //       data: [10],
  //     },
  //     {
  //       name: 'USDT',
  //       data: [0],
  //     },
  //   ];

  return (
    <>
      <div className=" p-4">
        <div className="py-6 px-2 md:px-5">
          <div className="w-full ">
            <div>
              <div id="chart">
                {options ? (
                  <div id="chart-timeline">
                    {typeof window !== undefined && (
                      <ApexCharts
                        options={options}
                        series={options.series}
                        type="donut"
                        height={250}
                        width="380"
                      />
                    )}
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

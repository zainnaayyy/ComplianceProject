'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const DashChart = () => {
  const dates = [
    [1579651200000, 100],
    [1580246400000, 120],
    [1582848000000, 90],
    // Add more dummy data as needed
  ];
  const additionalData = [
    [1579651200000, 80],
    [1580246400000, 110],
    [1582848000000, 120],
    // Add more dummy data for additional lines
  ];

  const [series, setSeries] = useState([
    {
      // name: 'ABC MOTORS',
      data: additionalData,
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'area',
      toolbar: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    // title: {
    //   text: 'Fundamental Analysis of Stocks',
    //   align: 'left',
    // },
    // subtitle: {
    //   text: 'Price Movements',
    //   align: 'left',
    // },
    xaxis: {
      type: 'datetime',
      categories: [
        '2018-09-19T00:00:00.000Z',
        '2018-09-19T01:30:00.000Z',
        '2018-09-19T02:30:00.000Z',
        '2018-09-19T03:30:00.000Z',
        '2018-09-19T04:30:00.000Z',
        '2018-09-19T05:30:00.000Z',
        '2018-09-19T06:30:00.000Z',
      ],
    },
    // yaxis: {
    //   labels: {
    //     formatter: function (value: number) {
    //       return value > 1000 ? (value / 1000).toFixed(0) + 'k' : value;
    //     },
    //   },
    // },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  });

  return (
    <div>
      {' '}
      <ReactApexChart
        options={options}
        series={series}
        type={'area'}
        width={'100%'}
        // options={options}
        height={'300'}
      />
    </div>
  );
};

export default DashChart;

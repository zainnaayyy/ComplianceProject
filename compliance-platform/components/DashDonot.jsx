'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const DashDonot = () => {
  const [series, setSeries] = useState([44, 55, 13]);

  const options = {
    chart: {
      width: 380,
      type: 'donut',
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      position: 'bottom',
      offsetY: 0,
      height: 30,
      formatter: function (val, opts) {
        return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
      },
    },
  };

  return (
    <div>
      <div>
        <div className='chart-wrap'>
          <div id='chart'>
            <ReactApexChart
              options={options}
              series={series}
              type='donut'
              width={'100%'}
              height={'300'}
            />
          </div>
        </div>
      </div>
      <div id='html-dist'></div>
    </div>
  );
};

export default DashDonot;

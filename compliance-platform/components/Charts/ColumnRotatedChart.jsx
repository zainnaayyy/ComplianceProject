'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const ColumnRotatedChart = () => {
  const [series, setSeries] = useState([
    {
      data: [21, 22, 10, 28, 16, 21, 13, 30, 19, 23, 29, 15, 27],
    },
  ]);

  const options = {
    chart: {
      height: 350,
      type: 'bar',
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        },
      },
    },
    colors: [
      '#FF0000',
      '#FF0000',
      '#FF0000',
      '#FF0000',
      '#FF0000', // First 5 bars red
      '#00FF00',
      '#00FF00',
      '#00FF00',
      '#00FF00',
      '#00FF00', // Next 5 bars green
      '#006400',
      '#006400',
      '#006400', // Next 3 bars dark green
    ],
    plotOptions: {
      bar: {
        columnWidth: '65%',
        distributed: true,
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [
        ['John', 'Doe'],
        ['Joe', 'Smith'],
        ['Jake', 'Williams'],
        'Amber',
        ['Peter', 'Brown'],
        ['Mary', 'Evans'],
        ['David', 'Wilson'],
        ['Lily', 'Roberts'],
        ['Chris', 'Young'],
        ['Laura', 'Garcia'],
        ['James', 'Johnson'],
        ['Patricia', 'Brown'],
        ['Michael', 'Martinez'],
      ],
      labels: {
        style: {
          colors: [
            '#FF0000',
            '#FF0000',
            '#FF0000',
            '#FF0000',
            '#FF0000',
            '#00FF00',
            '#00FF00',
            '#00FF00',
            '#00FF00',
            '#00FF00',
            '#006400',
            '#006400',
            '#006400',
          ],
          fontSize: '12px',
        },
      },
    },
  };

  return (
    <div>
      <div id='chart'>
        <ReactApexChart
          options={options}
          series={series}
          type='bar'
          height={350}
        />
      </div>
      <div id='html-dist'></div>
    </div>
  );
};

export default ColumnRotatedChart;

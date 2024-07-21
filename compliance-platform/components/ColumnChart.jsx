'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const ColumnChart = () => {
  const [series, setSeries] = useState([
    {
      name: 'Servings',
      data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65],
    },
  ]);

  const [options, setOptions] = useState({
    annotations: {
      points: [
        {
          x: 'Bananas',
          seriesIndex: 0,
        },
      ],
    },
    chart: {
      height: 250,
      type: 'bar',
      toolbar: false,
    },
    colors: ['#FE9DB5'],
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '50%',
        colors: {
          ranges: [
            {
              color: '#FE9DB5', // Change the color of the columns to #FE9DB5
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
    },
    grid: {
      show: false, // Remove the horizontal grid lines
    },
    xaxis: {
      labels: {
        rotate: -45,
      },
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'oct',
        'nov',
        'dec',
      ],
      tickPlacement: 'on',
    },
    yaxis: {},
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100],
      },
    },
  });

  return (
    <div>
      <div id='chart'>
        <ReactApexChart
          options={options}
          width={'100%'}
          series={series}
          type='bar'
          height={250}
        />
      </div>
      <div id='html-dist'></div>
    </div>
  );
};

export default ColumnChart;

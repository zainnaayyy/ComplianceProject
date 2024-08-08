'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
// import { generateData } from './utils'; // Assuming generateData function is defined in a separate file

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const generateData = (count, { min, max }) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return data;
};

const HeatMapChart = () => {
  const [series, setSeries] = useState([
    { name: 'Jan', data: generateData(5, { min: -30, max: 55 }) },
    { name: 'Feb', data: generateData(5, { min: -30, max: 55 }) },
    { name: 'Mar', data: generateData(5, { min: -30, max: 55 }) },
    { name: 'Apr', data: generateData(5, { min: -30, max: 55 }) },
    { name: 'May', data: generateData(5, { min: -30, max: 55 }) },
  ]);

  const options = {
    chart: {
      height: 350,
      type: 'heatmap',
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 0,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [
            { from: -30, to: 5, name: 'low', color: '#00A100' },
            { from: 6, to: 20, name: 'medium', color: '#128FD9' },
            { from: 21, to: 45, name: 'high', color: '#FFB200' },
            { from: 46, to: 55, name: 'extreme', color: '#FF0000' },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
    },
    // title: {
    //   text: 'HeatMap Chart with Color Range',
    // },
  };

  return (
    <div>
      <div id='chart'>
        <ReactApexChart
          options={options}
          series={series}
          type='heatmap'
          height={450}
        />
      </div>
      <div id='html-dist'></div>
    </div>
  );
};

export default HeatMapChart;

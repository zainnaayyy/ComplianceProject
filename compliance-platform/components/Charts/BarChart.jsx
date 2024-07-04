'use client';
import React from 'react';

// import { Bar } from '@ant-design/plots';
import dynamic from 'next/dynamic';
const Bar = dynamic(() => import('@ant-design/plots').then((mod) => mod.Bar), {
  ssr: false,
});

const data = [
  {
    labelName: 'first',
    value: 110,
  },
  {
    labelName: 'second',
    value: 220,
  },
  {
    labelName: 'third',
    value: 330,
  },
  {
    labelName: 'fourth',
    value: 440,
  },
];

const BarChart = () => {
  const config = {
    data,
    xField: 'labelName',
    yField: 'value',
    paddingRight: 80,
    style: {
      maxWidth: 25,
    },
    markBackground: {
      label: {
        text: ({ originData }) => {
          return `${(originData.value / 1000) * 100}% | ${originData.value}`;
        },
        position: 'right',
        dx: 80,
        style: {
          fill: '#aaa',
          fillOpacity: 1,
          fontSize: 14,
        },
      },
      style: {
        fill: '#eee',
      },
    },
    scale: {
      y: {
        domain: [0, 1000],
      },
    },
    axis: {
      x: {
        tick: false,
        title: false,
      },
      y: {
        grid: false,
        tick: false,
        label: false,
        title: false,
      },
    },
    interaction: {
      elementHighlightByColor: false,
    },
  };

  return <Bar {...config} />;
};

export default BarChart;

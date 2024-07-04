'use client';
import dynamic from 'next/dynamic';
import React from 'react';

const Pie = dynamic(() => import('@ant-design/plots').then((mod) => mod.Pie), {
  ssr: false,
});

const PieChart = () => {
  const config = {
    data: [
      { type: '分类一', value: 27 },
      { type: '分类二', value: 25 },
      { type: '分类三', value: 18 },
      { type: '分类四', value: 15 },
      { type: '分类五', value: 10 },
      { type: '其他', value: 5 },
    ],
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: false,
  };

  return <Pie {...config} />;
};

export default PieChart;

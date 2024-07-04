import BarChart from '@/components/Charts/BarChart';
import LineChart from '@/components/Charts/LineChart';
import PieChart from '@/components/Charts/PieChart';
import React from 'react';

const page = () => {
  return (
    <>
      <div className='h-full'>
        <LineChart />
      <div className='flex items-center justify-center mt-5'>
        <BarChart />
        <PieChart />
      </div>
      </div>
    </>
  );
};

export default page;

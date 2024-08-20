import React from 'react';
import DashChart from '@/components/DashChart';
import DashDonot from '@/components/DashDonot';
import HeatMapChart from '@/components/Charts/HeatMapChart';
import BarChart from '@/components/Charts/BarChart';
import StackedBarChart from '@/components/Charts/StackedBarChart';
import ColumnChart from '@/components/Charts/ColumnChart';
import ColumnRotatedChart from '@/components/Charts/ColumnRotatedChart';
import DashTabs from '@/components/DashTabs';

const DashboardPage = async () => {
  const cardsData = [
    {
      title: 'Total Earnings',
      amount: '3504',
      updated: '12/24/2024',
      icon: '../icons/coin.png',
    },
    {
      title: 'Pending Earnings',
      amount: '3504',
      updated: '12/24/2024',
      icon: '../icons/earning.png',
    },
    {
      title: 'Total Workers',
      amount: '3504',
      updated: '12/24/2024',
      icon: '../icons/customericon.png',
    },
    {
      title: 'Total Customers',
      amount: '3504',
      updated: '12/24/2024',
      icon: '../icons/coin.png',
    },
    // Add more card data objects as needed
  ];

  const progressBarsData = [
    {
      title: 'Active Customers',
      amount: '3000',
      updated: 'Updated Yesterday',
      icon: '../../icons/coin.png',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus diam enim, vulputate vel lectus sit amet, ultrices vestibulum lectus. P',
      infoIcon: '../../icons/infoicon.png',
    },
  ];

  return (
    <div className='bg-slate-50 dark:bg-dark-muted-800'>
      <div>
        <DashTabs />
      </div>
      {/* charts portion */}
      <div>
        <div className=' mt-10'>
          <HeatMapChart />

          {/* <div className='w-1/2'>
            <BarChart />
          </div> */}
        </div>
        <div className='flex mt-10'>
          <div className='w-1/2'>
            <StackedBarChart />
          </div>
          <div className='w-1/2'>
            <ColumnChart />
          </div>
        </div>
        <div className='mt-10'>
          <ColumnRotatedChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

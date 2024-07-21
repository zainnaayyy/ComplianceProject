import React from 'react';
import DashChart from '@/components/DashChart';
import DashDonot from '@/components/DashDonot';

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
    <div className='bg-slate-50 dark:bg-black'>
      <div className='mt-14'>
        <div className='flex dark:bg-black space-x-0 sm:space-x-5'>
          <div className='w-1/2 m-1 p-2 overflow-x-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Map through the array of card data */}
            {cardsData.map((card, index) => (
              <div
                key={index}
                className='max-w-xs  rounded-lg shadow-sm bg-white dark:bg-gray-500 p-4'
              >
                <div className='flex justify-between'>
                  <h1 className='text-md dark:text-white font-semibold text-gray-500'>
                    {card.title}
                  </h1>
                  <img src={card.icon} className='w-8 h-8' alt='' />
                </div>
                <div>
                  <h1 className='font-bold mt-6 text-xl'>{card.amount}</h1>
                  <h1 className='text-xs'>Updated - {card.updated}</h1>
                </div>
              </div>
            ))}
          </div>
          <div className='w-1/2 m-1 p-2 overflow-x-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Map through the array of card data */}
            {cardsData.map((card, index) => (
              <div
                key={index}
                className='max-w-xs  rounded-lg shadow-sm bg-white dark:bg-gray-500 p-4'
              >
                <div className='flex justify-between'>
                  <h1 className='text-md dark:text-white font-semibold text-gray-500'>
                    {card.title}
                  </h1>
                  <img src={card.icon} className='w-8 h-8' alt='' />
                </div>
                <div>
                  <h1 className='font-bold mt-6 text-xl'>{card.amount}</h1>
                  <h1 className='text-xs'>Updated - {card.updated}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex  w-full items-center  p-2 mt-6 space-x-0 sm:space-x-5'>
          <div className='w-[75%] bg-white dark:bg-black'>
            <div className='flex w-full items-center justify-between px-5'>
              <div className='flex flex-col mt-2'>
                <h1 className='dark:text-white text-gray-500 text-xs'>
                  Earnings
                </h1>
                <h1 className='dark:text-white text-gray-500 text-3xl font-bold'>
                  $30k
                </h1>
              </div>
            </div>
            <div>
              <DashChart />
            </div>
          </div>
          <div>
            <div className='flex bg-white dark:bg-black flex-col mt-2'>
              <h1 className='dark:text-white  text-gray-500 text-lg p-4'>
                Services
              </h1>
            </div>

            <div className='bg-white dark:bg-black h-80 flex items-center'>
              <DashDonot />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

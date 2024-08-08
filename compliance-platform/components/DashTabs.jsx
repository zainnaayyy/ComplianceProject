'use client';
import React from 'react';
import { Tabs, DatePicker, Table, Progress } from 'antd';
import {
  faarr,
  FaArrowTre,
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaArrowTrendUpndUp,
} from 'react-icons/fa6';
const onChange = (key) => {
  console.log(key);
};

const columns = [
  {
    title: 'Question',
    dataIndex: 'question',
    key: 'question',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Progress',
    dataIndex: 'progress',
    key: 'progress',
    render: (progress) => <Progress percent={progress} showInfo={false} />,
  },
  {
    title: 'Percentage',
    dataIndex: 'percentage',
    key: 'percentage',
    render: (percentage) => <span>{percentage}%</span>,
  },
];

const data = [
  {
    key: '1',
    question: 'Did the call start with probing situational questions?',
    progress: 100,
    percentage: 100,
  },
  {
    key: '2',
    question: "Were customer's problems revealed through questioning?",
    progress: 100,
    percentage: 100,
  },
  {
    key: '3',
    question: 'Were impacts of the problems discussed during the call?',
    progress: 50,
    percentage: 50,
  },
  {
    key: '4',
    question: 'Did the conversation articulate the need for a solution?',
    progress: 100,
    percentage: 100,
  },
  {
    key: '5',
    question: 'Did the proposed solution directly address the issues?',
    progress: 50,
    percentage: 50,
  },
  {
    key: '6',
    question: 'Were specific benefits of the solution clearly demonstrated?',
    progress: 50,
    percentage: 50,
  },
  {
    key: '7',
    question: "Were customer's objections effectively neutralized?",
    progress: 50,
    percentage: 50,
  },
  {
    key: '8',
    question: 'Did the call end with securing next step commitments?',
    progress: 50,
    percentage: 50,
  },
];

const cardData = [
  {
    title: 'MEDDIC',
    value: 50,
    up: true,
    additional: '7/23 (Used vs total calls)',
    status: 'neutral',
  },
  {
    title: 'SPICED',
    value: 23,
    up: false,
    additional: '1/23 (Used vs total calls)',
    status: 'low',
  },
  {
    title: 'SPIN',
    value: 72,
    up: true,
    additional: '8/23 (Used vs total calls)',
    status: 'highlight',
  },
  {
    title: 'Chase',
    value: 79,
    up: true,
    additional: '8/23 (Used vs total calls)',
    status: 'highlight',
  },
];

const items = [
  {
    key: '1',
    label: 'Scorecards',
    children: (
      <div className='p-4'>
        <div className='flex justify-between'>
          <div className='text-3xl font-semibold text-black dark:text-white'>
            Analytics Dashboard
          </div>
          <div>
            <DatePicker.RangePicker />
          </div>
        </div>
        <div className='mt-4'>
          <h2 className='text-lg font-medium text-black dark:text-white'>
            Call Types: Average & Trend
          </h2>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4'>
          {['Discovery', 'Cold-call', 'Demo', 'Notification'].map(
            (type, index) => (
              <div
                key={index}
                className='p-4 bg-white text-black dark:text-white dark:bg-gray-800 rounded-lg shadow-md border flex justify-between items-center'
              >
                <div className='font-medium'>{type}</div>
                <div className='flex items-center'>
                  <span className='text-lg font-bold mr-2'>
                    {Math.floor(Math.random() * 100)}
                  </span>
                  {Math.random() > 0.5 ? (
                    <FaArrowTrendUp className='text-green-500' />
                  ) : (
                    <FaArrowTrendDown className='text-red-500' />
                  )}
                </div>
              </div>
            )
          )}
        </div>
        <div className='mt-4'>
          <h2 className='text-lg font-semibold mb-2 text-black dark:text-white'>
            Discovery Scorecards: Average & Trends
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {cardData.map((card, index) => (
              <div
                key={index}
                className={`p-4 bg-white text-black dark:text-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col justify-between border `}
              >
                <div className='font-medium'>{card.title}</div>
                <div className='flex items-center text-2xl font-bold my-2'>
                  <span className='mr-2'>{card.value}</span>
                  {card.up ? (
                    <FaArrowTrendUp className='text-green-500' />
                  ) : (
                    <faarr className='text-red-500' />
                  )}
                </div>
                <div className='text-sm text-gray-500'>{card.additional}</div>
              </div>
            ))}
          </div>
        </div>
        <div className='mt-6'>
          <h2 className='text-lg font-semibold text-black dark:text-white'>
            SPIN Selling
          </h2>
          <Table
            className='mt-6'
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </div>
      </div>
    ),
  },
  {
    key: '2',
    label: 'Performance',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Evaluation',
    children: 'Content of Tab Pane 3',
  },
];
const DashTabs = () => (
  <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
);
export default DashTabs;

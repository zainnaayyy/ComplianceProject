'use client'
import { useEffect, useState } from "react";
import { Dropdown } from "antd";
import { FaBoxesPacking, FaBuilding, FaIdCard, FaPowerOff, FaSitemap } from "react-icons/fa6";
import { actionAPI, useSharedSelector, useSharedDispatcher, useAuth } from "@/shared";
import LookupsDrawer from "./Drawers/LookupsDrawer";
import Image from "next/image";

const Navbar = ({handleToggleSideBar, isSideBar, handleThemeToggle, theme, logout, token}) => {
  const dispatcher = useSharedDispatcher()
  const { user } = useAuth();
  const [data, setData] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);

  const items = [
    {
      key: '1',
      icon: <FaBuilding />,
      label: 'Line of Business',
    },
    {
      key: '2',
      icon: <FaSitemap />,
      label: 'Sites',
    },
    {
      key: '3',
      icon: <FaIdCard />,
      label: 'Roles',
    },
  ];

  const onClick = async ({ key }) => {
    setData(key);
    if (key === '1') dispatcher(actionAPI.getLOBs(token));
    if (key === '2') dispatcher(actionAPI.getSites(token));
    if (key === '3') dispatcher(actionAPI.getRoles(token));
    setOpenDrawer(true);
  };

  return (
    <div className='relative z-50 mb-5 flex h-16 items-center gap-2'>
      <button
        type='button'
        onClick={handleToggleSideBar}
        className='flex h-10 w-10 items-center justify-center -ms-3'
      >
        <div className={`${isSideBar && 'scale-90'} relative h-5 w-5`}>
          <span
            className={`bg-dark-primary-500 absolute block h-0.5 w-full transition-all duration-300 ${
              isSideBar
                ? '-rotate-45 rtl:rotate-45 max-w-[75%] top-1'
                : 'top-0.5'
            }`}
          ></span>
          <span
            className={`bg-dark-primary-500 absolute top-1/2 block h-0.5 w-full max-w-[50%] transition-all duration-300 ${
              isSideBar && 'opacity-0 translate-x-4'
            }`}
          ></span>
          <span
            className={`bg-dark-primary-500 absolute block h-0.5 w-full transition-all duration-300 ${
              isSideBar
                ? 'rotate-45 rtl:-rotate-45 max-w-[75%] bottom-1'
                : 'bottom-0'
            }`}
          ></span>
        </div>
      </button>
      <h1 className='font-heading text-2xl font-light leading-normal text-muted-800 hidden dark:text-white md:block'>
        Compliance Forms
      </h1>
      <div className='ms-auto'></div>
      <div className='flex items-center gap-2 h-16'>
        <div className='group inline-flex items-center justify-center text-right'>
          <div data-headlessui-state className='relative h-9 w-9 text-left'>
            <div
              id='headlessui-menu-button-207'
              aria-haspopup='menu'
              aria-expanded='false'
              data-headlessui-state
            >
              <button
                type='button'
                onClick={handleThemeToggle}
                className='group-hover:ring-dark-muted-200 dark:group-hover:ring-dark-muted-700 dark:ring-offset-dark-muted-900 inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-transparent transition-all duration-300 group-hover:ring-offset-4 nui-focus'
              >
                <span className='border-dark-muted-200 dark:border-dark-muted-700 dark:bg-dark-muted-800 flex h-9 w-9 items-center justify-center rounded-full border bg-white'>
                  {theme === 'light' ? (
                    <svg
                      aria-hidden='true'
                      viewBox='0 0 24 24'
                      className='pointer-events-none absolute start-1/2 top-1/2 block h-5 w-5 text-yellow-400 transition-all duration-300 -translate-y-1/2 translate-x-[-50%] opacity-100 rtl:translate-x-[50%]'
                    >
                      <g
                        fill='currentColor'
                        stroke='currentColor'
                        className='stroke-2'
                      >
                        <circle cx='12' cy='12' r='5'></circle>
                        <path d='M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42'></path>
                      </g>
                    </svg>
                  ) : (
                    <svg
                      aria-hidden='true'
                      viewBox='0 0 24 24'
                      className='pointer-events-none absolute start-1/2 top-1/2 block h-5 w-5 text-yellow-400 transition-all duration-300 -translate-y-1/2 translate-x-[-45%] opacity-100 rtl:translate-x-[45%]'
                    >
                      <path
                        fill='currentColor'
                        stroke='currentColor'
                        d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'
                        className='stroke-2'
                      />
                    </svg>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className='group inline-flex items-center justify-center text-right'>
          <div data-headlessui-state className='relative h-9 w-9 text-left'>
            <div
              id='headlessui-menu-button-207'
              aria-haspopup='menu'
              aria-expanded='false'
              data-headlessui-state
            >
              <button
                type='button'
                className='group-hover:ring-dark-muted-200 dark:group-hover:ring-dark-muted-700 dark:ring-offset-dark-muted-900 inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-transparent transition-all duration-300 group-hover:ring-offset-4 nui-focus'
              >
                <span className='border-dark-muted-200 dark:border-dark-muted-700 dark:bg-dark-muted-800 flex h-9 w-9 items-center justify-center rounded-full border bg-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    className='icon dark:text-dark-muted-400 h-5 w-5'
                    width='1em'
                    height='1em'
                    viewBox='0 0 256 256'
                    data-v-cd102a71=''
                  >
                    <g fill='currentColor'>
                      <path
                        d='M208 192H48a8 8 0 0 1-6.88-12C47.71 168.6 56 139.81 56 104a72 72 0 0 1 144 0c0 35.82 8.3 64.6 14.9 76a8 8 0 0 1-6.9 12Z'
                        opacity='.2'
                      ></path>
                      <path d='M221.8 175.94c-5.55-9.56-13.8-36.61-13.8-71.94a80 80 0 1 0-160 0c0 35.34-8.26 62.38-13.81 71.94A16 16 0 0 0 48 200h40.81a40 40 0 0 0 78.38 0H208a16 16 0 0 0 13.8-24.06ZM128 216a24 24 0 0 1-22.62-16h45.24A24 24 0 0 1 128 216Zm-80-32c7.7-13.24 16-43.92 16-80a64 64 0 1 1 128 0c0 36.05 8.28 66.73 16 80Z'></path>
                    </g>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>

        <Dropdown arrow placement='bottomRight' menu={{ items, onClick }}>
          <button
            type='button'
            className='border-dark-muted-200 hover:ring-dark-muted-200 dark:hover:ring-dark-muted-700 dark:border-dark-muted-700 dark:bg-dark-muted-800 dark:ring-offset-dark-muted-900 flex h-9 w-9 items-center justify-center rounded-full border bg-white ring-1 ring-transparent transition-all duration-300 hover:ring-offset-4 nui-focus'
          >
            <FaBoxesPacking />
          </button>
        </Dropdown>

        <div className='group inline-flex items-center justify-center text-right'>
          <div data-headlessui-state className='relative h-9 w-9 text-left'>
            <Dropdown
              arrow
              placement='bottomRight'
              menu={{
                items: [
                  {
                    key: '1',
                    danger: true,
                    label: 'Logout',
                    icon: <FaPowerOff />,
                  },
                ],
                onClick: logout,
              }}
            >
              <button
                className='group-hover:ring-dark-primary-500 dark:ring-offset-dark-muted-900 inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-transparent transition-all duration-300 group-hover:ring-offset-4 nui-focus'
                id='headlessui-menu-button-209'
                aria-haspopup='menu'
                aria-expanded='false'
              >
                <div className='relative inline-flex h-9 w-9 items-center justify-center rounded-full'>
                  <Image
                    width={200}
                    height={200}
                    src={
                      user.profileImage
                        ? user.profileImage
                        : 'https://tairo.cssninja.io/img/avatars/2.svg'
                    }
                    className='max-w-full max-h-full rounded-full object-cover shadow-sm dark:border-transparent'
                    alt="profile-image"
                  />
                </div>
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
      {openDrawer ? (
        <LookupsDrawer
          title={
            data === '1'
              ? 'Line of Business'
              : data === '2'
              ? 'Sites'
              : data === '3'
              ? 'Roles'
              : ''
          }
          visible={openDrawer}
          onClose={() => {
            setOpenDrawer(false);
            setData(0);
          }}
          token={token}
        />
      ) : null}
    </div>
  );
};

export default Navbar;

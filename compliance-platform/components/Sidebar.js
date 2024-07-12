'use client'
import Link from "next/link";
import { MdOutlineAdminPanelSettings, MdOutlineDashboard, MdOutlineShoppingCart } from 'react-icons/md'
import { FaDropbox, FaWpforms } from 'react-icons/fa'
import { usePathname } from "next/navigation";
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoMdHelpBuoy } from 'react-icons/io';
import { MdOutlineDisplaySettings } from 'react-icons/md';
import { MdFactCheck } from 'react-icons/md';
import { MdViewHeadline } from 'react-icons/md';

const Sidebar = ({ isSideBar, handleToggleSideBar }) => {
  const path = usePathname();
  return (
    <div
      className={`pointer-events-none fixed start-0 top-0 z-[60] flex h-full xl:z-10 ${
        !isSideBar && 'hidden'
      }`}
    >
      <div className='border-light-muted-200 dark:border-dark-muted-700 dark:bg-dark-muted-800 bg-light-muted-50 pointer-events-auto relative z-10 h-full w-[250px] transition-all duration-300'>
        <div className='flex h-screen flex-col'>
          <div className='flex h-32 w-full items-center px-6'>
            <div className='font-heading text-dark-muted-700 font-semibold text-xl capitalize dark:text-light-muted-50'>
              Admin Dashboard
            </div>
            <button
              type='button'
              onClick={handleToggleSideBar}
              className='dark:text-dark-muted-400 text-light-muted-800 hover:dark:bg-dark-muted-100 hover:bg-light-muted-100 hover:dark:text-dark-muted-600 hover:text-dark-muted-600 ms-auto flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 xl:hidden'
            >
              X
            </button>
          </div>

          <div className='slimscroll relative h-full w-full overflow-y-auto'>
            <div className='px-6 pb-8 pr-0'>
              <ul>
                <li className='group mb-1 min-h-[2rem]'>
                  <Link
                    href={'/'}
                    className={`${
                      path === '/' &&
                      'dark:bg-dark-muted-900 bg-light-muted-100 p-2 rounded-l-lg'
                    }  nui-focus relative top-0.5 flex items-center`}
                  >
                    <span
                      className={`${
                        path === '/'
                          ? 'dark:text-dark-primary-300 text-dark-primary-500'
                          : 'text-dark-muted-500'
                      } group-hover:dark:text-dark-primary-500 group-hover:text-dark-primary-800 relative inline-flex items-center gap-2 font-sans text-md transition-colors duration-300`}
                    >
                      <MdOutlineDashboard />
                      <span>Dashboard</span>
                    </span>
                  </Link>
                </li>

                <li className='group mb-1 min-h-[2rem]'>
                  <Link
                    href={'/users'}
                    className={`${
                      path === '/users' &&
                      'dark:bg-dark-muted-900 bg-light-muted-100 p-2 rounded-l-lg'
                    } nui-focus relative top-0.5 flex items-center`}
                  >
                    <span
                      className={`${
                        path === '/users'
                          ? 'dark:text-dark-primary-300 text-dark-primary-500'
                          : 'text-dark-muted-500'
                      } group-hover:dark:text-dark-primary-500 group-hover:text-dark-primary-800 relative inline-flex items-center gap-2 font-sans text-md transition-colors duration-300`}
                    >
                      <FaPeopleGroup />
                      <span>Staff</span>
                    </span>
                  </Link>
                </li>

                <li className='group mb-1 min-h-[2rem]'>
                  <Link
                    href={'/form'}
                    className={`${
                      path === '/form' &&
                      'dark:bg-dark-muted-900 bg-light-muted-100 p-2 rounded-l-lg'
                    } nui-focus relative top-0.5 flex items-center`}
                  >
                    <span
                      className={`${
                        path === '/form'
                          ? 'dark:text-dark-primary-300 text-dark-primary-500'
                          : 'text-dark-muted-500'
                      } group-hover:dark:text-dark-primary-500 group-hover:text-dark-primary-800 relative inline-flex items-center gap-2 font-sans text-md transition-colors duration-300`}
                    >
                      <FaWpforms />
                      <span>Forms</span>
                    </span>
                  </Link>
                </li>

                <li className='group mb-1 min-h-[2rem]'>
                  <Link
                    href={'/coaching'}
                    className={`${
                      path === '/coaching' &&
                      'dark:bg-dark-muted-900 bg-light-muted-100 p-2 rounded-l-lg'
                    } nui-focus relative top-0.5 flex items-center`}
                  >
                    <span
                      className={`${
                        path === '/coaching'
                          ? 'dark:text-dark-primary-300 text-dark-primary-500'
                          : 'text-dark-muted-500'
                      } group-hover:dark:text-dark-primary-500 group-hover:text-dark-primary-800 relative inline-flex items-center gap-2 font-sans text-md transition-colors duration-300`}
                    >
                      <IoMdHelpBuoy />
                      <span>Coaching</span>
                    </span>
                  </Link>
                </li>

                <li className='group mb-1 min-h-[2rem]'>
                  <Link
                    href={'/setup'}
                    className={`${
                      path === '/setup' &&
                      'dark:bg-dark-muted-900 bg-light-muted-100 p-2 rounded-l-lg'
                    } nui-focus relative top-0.5 flex items-center`}
                  >
                    <span
                      className={`${
                        path === '/setup'
                          ? 'dark:text-dark-primary-300 text-dark-primary-500'
                          : 'text-dark-muted-500'
                      } group-hover:dark:text-dark-primary-500 group-hover:text-dark-primary-800 relative inline-flex items-center gap-2 font-sans text-md transition-colors duration-300`}
                    >
                      <MdOutlineDisplaySettings />
                      <span>Setup</span>
                    </span>
                  </Link>
                </li>

                <li className='group mb-1 min-h-[2rem]'>
                  <Link
                    href={'/results'}
                    className={`${
                      path === '/results' &&
                      'dark:bg-dark-muted-900 bg-light-muted-100 p-2 rounded-l-lg'
                    } nui-focus relative top-0.5 flex items-center`}
                  >
                    <span
                      className={`${
                        path === '/results'
                          ? 'dark:text-dark-primary-300 text-dark-primary-500'
                          : 'text-dark-muted-500'
                      } group-hover:dark:text-dark-primary-500 group-hover:text-dark-primary-800 relative inline-flex items-center gap-2 font-sans text-md transition-colors duration-300`}
                    >
                      <MdFactCheck />
                      <span>Results</span>
                    </span>
                  </Link>
                </li>

                <li className='group mb-1 min-h-[2rem]'>
                  <Link
                    href={'/headline'}
                    className={`${
                      path === '/headline' &&
                      'dark:bg-dark-muted-900 bg-light-muted-100 p-2 rounded-l-lg'
                    } nui-focus relative top-0.5 flex items-center`}
                  >
                    <span
                      className={`${
                        path === '/headline'
                          ? 'dark:text-dark-primary-300 text-dark-primary-500'
                          : 'text-dark-muted-500'
                      } group-hover:dark:text-dark-primary-500 group-hover:text-dark-primary-800 relative inline-flex items-center gap-2 font-sans text-md transition-colors duration-300`}
                    >
                      <MdViewHeadline />
                      <span>Headline</span>
                    </span>
                  </Link>
                </li>

                {/* <li className="border-dark-muted-200 dark:border-dark-muted-700 my-3 h-px w-full border-t"></li>

                  <li className="mb-1 flex min-h-[2rem] items-center">
                    <a
                      href="https://tairo.cssninja.io/wizard"
                      className="nui-focus text-dark-muted-400 hover:text-dark-primary-500 flex w-full items-center transition-colors duration-300"
                    >
                      <span className="font-sans text-sm">Wizard</span>
                    </a>
                  </li>

                  <li className="border-dark-muted-200 dark:border-dark-muted-700 my-3 h-px w-full border-t"></li>

                  <li className="group mb-1 min-h-[2rem]">
                    <a
                      href="#"
                      className="nui-focus relative top-0.5 flex items-center"
                    >
                      <span className="text-dark-muted-400 group-hover:text-dark-primary-500 relative inline-flex items-center gap-2 font-sans text-sm transition-colors duration-300">
                        <span>Charts</span>
                      </span>
                    </a>
                    <div className="max-h-0 overflow-hidden opacity-0 group-focus-within:max-h-max group-focus-within:overflow-visible group-focus-within:opacity-100 transition-all duration-150">
                      <ul className="py-2">
                        <li className="flex h-8 w-full items-center">
                          <a
                            href="charts.html"
                            className="nui-focus text-dark-muted-400 hover:text-dark-primary-500 focus:text-dark-primary-500 flex w-full items-center ps-3 transition-colors duration-300"
                          >
                            <span className="font-sans text-xs">
                              Apex Charts
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="group mb-1 min-h-[2rem]">
                    <a
                      href="#"
                      className="nui-focus relative top-0.5 flex items-center"
                    >
                      <span className="text-dark-muted-400 group-hover:text-dark-primary-500 relative inline-flex items-center gap-2 font-sans text-sm transition-colors duration-300">
                        <span>Widgets</span>
                      </span>
                    </a>
                    <div className="max-h-0 overflow-hidden opacity-0 group-focus-within:max-h-max group-focus-within:overflow-visible group-focus-within:opacity-100 transition-all duration-150">
                      <ul className="py-2">
                        <li className="flex h-8 w-full items-center">
                          <a
                            href="widgets.html"
                            className="nui-focus text-dark-muted-400 hover:text-dark-primary-500 focus:text-dark-primary-500 flex w-full items-center ps-3 transition-colors duration-300"
                          >
                            <span className="font-sans text-xs">
                              UI Widgets
                            </span>
                          </a>
                        </li>
                        <li className="flex h-8 w-full items-center">
                          <a
                            href="widgets/creative.html"
                            className="nui-focus text-dark-muted-400 hover:text-dark-primary-500 focus:text-dark-primary-500 flex w-full items-center ps-3 transition-colors duration-300"
                          >
                            <span className="font-sans text-xs">
                              Creative Widgets
                            </span>
                          </a>
                        </li>
                        <li className="flex h-8 w-full items-center">
                          <a
                            href="widgets/list.html"
                            className="nui-focus text-dark-muted-400 hover:text-dark-primary-500 focus:text-dark-primary-500 flex w-full items-center ps-3 transition-colors duration-300"
                          >
                            <span className="font-sans text-xs">
                              List Widgets
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

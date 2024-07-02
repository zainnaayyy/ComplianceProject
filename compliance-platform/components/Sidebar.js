'use client'
import Link from "next/link";
import { MdOutlineAdminPanelSettings, MdOutlineDashboard, MdOutlineShoppingCart } from 'react-icons/md'
import { FaDropbox } from 'react-icons/fa'
import { usePathname } from "next/navigation";

const Sidebar = ({isSideBar, handleToggleSideBar}) => {
  const path = usePathname()
  return (
      <div className={`pointer-events-none fixed start-0 top-0 z-[60] flex h-full xl:z-10 ${!isSideBar && 'hidden'}`}>
        <div className="border-muted-200 dark:border-muted-700 dark:bg-muted-800 pointer-events-auto relative z-10 h-full w-[220px] bg-white transition-all duration-300">
          <div className="flex h-screen flex-col">
            <div className="flex h-16 w-full items-center px-6">
              <div className="font-heading text-muted-700 text-lg font-light capitalize dark:text-white">
                Admin Dashboard
              </div>
              <button
                type="button"
                onClick={handleToggleSideBar}
                className="text-muted-400 hover:bg-muted-100 hover:text-muted-600 ms-auto flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 xl:hidden"
              >
                X
              </button>
            </div>

            <div className="slimscroll relative h-full w-full overflow-y-auto">
              <div className="px-6 pb-8 pr-0">
                <ul>
                  <li className="group mb-1 min-h-[2rem]">
                    <Link
                      href={'/'}
                      className={`${path === '/' && 'bg-muted-900 p-2 rounded-l-lg'}  nui-focus relative top-0.5 flex items-center`}
                    >
                      <span className={`${path === '/' && 'text-primary-300'} text-muted-400 group-hover:text-primary-500 relative inline-flex items-center gap-2 font-sans text-md transition-colors duration-300`}>
                        <MdOutlineDashboard />
                        <span>Dashboard</span>
                      </span>
                    </Link>
                  </li>

                  <li className="group mb-1 min-h-[2rem]">
                    <Link
                      href={'/products'}
                      className={`${path === '/products' && 'bg-muted-900 p-2 rounded-l-lg'} nui-focus relative top-0.5 flex items-center`}
                    >
                      <span className={`${path === '/products' && 'text-primary-300'} text-muted-400 group-hover:text-primary-500 relative inline-flex items-center gap-2 font-sans text-md transition-colors duration-300`}>
                        <FaDropbox />
                        <span>Products</span>
                      </span>
                    </Link>
                  </li>

                  <li className="group mb-1 min-h-[2rem]">
                    <Link
                      href={'/orders'}
                      className={`${path === '/orders' && 'bg-muted-900 p-2 rounded-l-lg'} nui-focus relative top-0.5 flex items-center`}
                    >
                      <span className={`${path === '/orders' && 'text-primary-300'} text-muted-400 group-hover:text-primary-500 relative inline-flex items-center gap-2 font-sans text-md transition-colors duration-300`}>
                        <MdOutlineShoppingCart />
                        <span>Orders</span>
                      </span>
                    </Link>
                  </li>

                  <li className="group mb-1 min-h-[2rem]">
                    <Link
                      href={'/settings'}
                      className={`${path === '/settings' && 'bg-muted-900 p-2 rounded-l-lg'} nui-focus relative top-0.5 flex items-center`}
                    >
                      <span className={`${path === '/settings' && 'text-primary-300'} text-muted-400 group-hover:text-primary-500 relative inline-flex items-center gap-2 font-sans text-md transition-colors duration-300`}>
                        <MdOutlineAdminPanelSettings />
                        <span>Settings</span>
                      </span>
                    </Link>
                  </li>

                  {/* <li className="border-muted-200 dark:border-muted-700 my-3 h-px w-full border-t"></li>

                  <li className="mb-1 flex min-h-[2rem] items-center">
                    <a
                      href="https://tairo.cssninja.io/wizard"
                      className="nui-focus text-muted-400 hover:text-primary-500 flex w-full items-center transition-colors duration-300"
                    >
                      <span className="font-sans text-sm">Wizard</span>
                    </a>
                  </li>

                  <li className="border-muted-200 dark:border-muted-700 my-3 h-px w-full border-t"></li>

                  <li className="group mb-1 min-h-[2rem]">
                    <a
                      href="#"
                      className="nui-focus relative top-0.5 flex items-center"
                    >
                      <span className="text-muted-400 group-hover:text-primary-500 relative inline-flex items-center gap-2 font-sans text-sm transition-colors duration-300">
                        <span>Charts</span>
                      </span>
                    </a>
                    <div className="max-h-0 overflow-hidden opacity-0 group-focus-within:max-h-max group-focus-within:overflow-visible group-focus-within:opacity-100 transition-all duration-150">
                      <ul className="py-2">
                        <li className="flex h-8 w-full items-center">
                          <a
                            href="charts.html"
                            className="nui-focus text-muted-400 hover:text-primary-500 focus:text-primary-500 flex w-full items-center ps-3 transition-colors duration-300"
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
                      <span className="text-muted-400 group-hover:text-primary-500 relative inline-flex items-center gap-2 font-sans text-sm transition-colors duration-300">
                        <span>Widgets</span>
                      </span>
                    </a>
                    <div className="max-h-0 overflow-hidden opacity-0 group-focus-within:max-h-max group-focus-within:overflow-visible group-focus-within:opacity-100 transition-all duration-150">
                      <ul className="py-2">
                        <li className="flex h-8 w-full items-center">
                          <a
                            href="widgets.html"
                            className="nui-focus text-muted-400 hover:text-primary-500 focus:text-primary-500 flex w-full items-center ps-3 transition-colors duration-300"
                          >
                            <span className="font-sans text-xs">
                              UI Widgets
                            </span>
                          </a>
                        </li>
                        <li className="flex h-8 w-full items-center">
                          <a
                            href="widgets/creative.html"
                            className="nui-focus text-muted-400 hover:text-primary-500 focus:text-primary-500 flex w-full items-center ps-3 transition-colors duration-300"
                          >
                            <span className="font-sans text-xs">
                              Creative Widgets
                            </span>
                          </a>
                        </li>
                        <li className="flex h-8 w-full items-center">
                          <a
                            href="widgets/list.html"
                            className="nui-focus text-muted-400 hover:text-primary-500 focus:text-primary-500 flex w-full items-center ps-3 transition-colors duration-300"
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

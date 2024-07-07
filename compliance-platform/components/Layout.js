'use client'
import { useEffect, useState } from "react";
import CircularMenu from "@/components/CircularMenu";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { useTheme } from 'next-themes';
import { AuthProvider, isEmpty, useAuth } from "@/shared";
import { Button, Input } from "antd";
// import LoginImage from "@/assets/image.png"

const Layout = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const { isValidToken, login, setIsValidToken } = useAuth()
  console.log(isValidToken)
  // **************** All States ****************
  const [isSideBar, setIsSideBar] = useState(true); // state for Sidebar visibility
  const [scrollPosition, setScrollPosition] = useState(0); // state for scroll position
  const [ email, setEmail] = useState('');
  const [ pass, setPass ] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // **************** All useEffects ****************
  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // **************** All Functions ****************
  //1. For handling sidebar visibility
  const handleToggleSideBar = () => {
    setIsSideBar(!isSideBar);
  };

  //2. For toggling theme
  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme);
  };

  //3. For handling scroll
  const handleScroll = () => {
    setScrollPosition(window.pageYOffset);
  };

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    let errorObject = {};
    // Validate email
    if (isEmpty(email) || !email.trim()) {
        errorObject = { ...errorObject, email: 'Email is required' } 
    }
    // Validate password
    if (isEmpty(pass) || !pass.trim()) {
        errorObject = { ...errorObject, pass: 'Password is required.' } 
    }
    // If there are errors, set them and return
    if (errorObject?.email != null || errorObject?.pass != null) {
      setIsLoading(false);
      return setError(errorObject)
    }
    
    const userData = await login(email, pass);
    console.log("userData: ", userData)
    if(!userData.success) {
      errorObject ={...errorObject, message: userData.message}
      setIsLoading(false);
      return setError(errorObject)
    }
    setIsValidToken(userData.user)
    setIsLoading(false);
  }

  return (
    <>
      {!isValidToken ? (
        <div className='flex flex-col sm:flex-row h-screen w-screen overflow-y-hidden'>
          <div className='flex justify-center items-center sm:hidden h-24 w-full'>
            <img src='/logow.svg' alt='logo' className='w-20 py-1' />
          </div>
          <div className='w-screen sm:w-1/2 flex flex-col justify-center items-center'>
            <div className='flex flex-col items-center mt-12'>
              <h3 className='text-2xl font-semibold mb-2'>Sign In</h3>
              <h5 className='font-medium mb-6 text-gray-500'>
                Your Admin Dashboard Awaits!
              </h5>
              <Input
                className='mb-4 px-4 py-3 w-80 text-black border border-gray-300 rounded-lg outline-none focus:border-green-500'
                id='text'
                name='text'
                placeholder='name@example.com'
                type='text'
                autoCapitalize='none'
                autoComplete='text'
                autoCorrect='off'
                disabled={isLoading}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                className='mb-4 px-4 py-3 w-80 text-black border border-gray-300 rounded-lg outline-none focus:border-green-500'
                id='pass'
                name='pass'
                placeholder='*********'
                type='password'
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect='off'
                disabled={isLoading}
                onChange={(e) => setPass(e.target.value)}
              />
              <p>{error?.pass ? <span className='text-red-600 text-xs'>{error?.pass}</span> : null}</p>
              <p className='flex justify-end w-full text-sm font-medium dark:text-dark-primary text-light-primary mb-5'>
                <a href='#!'>Forgot password?</a>
              </p>
              <Button loading={isLoading} onClick={onSubmit} className='mb-4 px-5 py-3 w-80 h-12 bg-light-primary dark:bg-dark-primary text-white rounded-lg'>
                Login
              </Button>
              <p>{error?.message ? <span className='text-red-600 text-xs'>{error?.message}</span> : null}</p>
            </div>
          </div>

          <div className='w-1/2 hidden sm:block'>
            <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
              <div className='absolute inset-0 bg-zinc-900' />
              <div className='relative z-20 flex items-center text-lg font-medium'>
                <Image
                  src='/logo.png'
                  width={200}
                  height={200}
                  alt='Authentication'
                  className='dark:block'
                />
              </div>
              <div className='relative z-20 mt-auto'>
                <blockquote className='space-y-2'>
                  <p className='text-lg'>
                    &ldquo;It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.&rdquo;
                  </p>
                  <footer className='text-sm'>Zain</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div id='__nuxt'>
          <div>
            <div className='bg-light-muted-100 dark:bg-dark-muted-900 pb-20'>
              {/* ******************************** This is the Sidebar ********************************   */}
              <Sidebar
                isSideBar={isSideBar}
                handleToggleSideBar={handleToggleSideBar}
              />

              {/* ******************************** This is the body *********************************/}
              <div
                className={`bg-muted-100 dark:bg-muted-900 relative min-h-screen w-full overflow-x-hidden px-4 transition-all duration-300 xl:px-10 ${
                  isSideBar
                    ? 'xl:max-w-[calc(100%_-_200px)] xl:ms-[200px]'
                    : 'xl:max-w-[calc(100%_-_40px)] xl:ms-[40px]'
                }`}
              >
                <div className='mx-auto w-full max-w-[90rem]'>
                  {/* ******************************* Header ***************************** */}
                  <div className='relative z-50 mb-5 flex h-16 items-center gap-2'>
                    <button
                      type='button'
                      onClick={handleToggleSideBar}
                      className='flex h-10 w-10 items-center justify-center -ms-3'
                    >
                      <div
                        className={`${
                          isSideBar && 'scale-90'
                        } relative h-5 w-5`}
                      >
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
                        <div
                          data-headlessui-state
                          className='relative h-9 w-9 text-left'
                        >
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
                        <div
                          data-headlessui-state
                          className='relative h-9 w-9 text-left'
                        >
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

                      <button
                        type='button'
                        className='border-dark-muted-200 hover:ring-dark-muted-200 dark:hover:ring-dark-muted-700 dark:border-dark-muted-700 dark:bg-dark-muted-800 dark:ring-offset-dark-muted-900 flex h-9 w-9 items-center justify-center rounded-full border bg-white ring-1 ring-transparent transition-all duration-300 hover:ring-offset-4 nui-focus'
                      >
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
                              d='M112 80a32 32 0 1 1-32-32a32 32 0 0 1 32 32Zm64 32a32 32 0 1 0-32-32a32 32 0 0 0 32 32Zm-96 32a32 32 0 1 0 32 32a32 32 0 0 0-32-32Zm96 0a32 32 0 1 0 32 32a32 32 0 0 0-32-32Z'
                              opacity='.2'
                            ></path>
                            <path d='M80 40a40 40 0 1 0 40 40a40 40 0 0 0-40-40Zm0 64a24 24 0 1 1 24-24a24 24 0 0 1-24 24Zm96 16a40 40 0 1 0-40-40a40 40 0 0 0 40 40Zm0-64a24 24 0 1 1-24 24a24 24 0 0 1 24-24Zm-96 80a40 40 0 1 0 40 40a40 40 0 0 0-40-40Zm0 64a24 24 0 1 1 24-24a24 24 0 0 1-24 24Zm96-64a40 40 0 1 0 40 40a40 40 0 0 0-40-40Zm0 64a24 24 0 1 1 24-24a24 24 0 0 1-24 24Z'></path>
                          </g>
                        </svg>
                      </button>

                      <div className='group inline-flex items-center justify-center text-right'>
                        <div
                          data-headlessui-state
                          className='relative h-9 w-9 text-left'
                        >
                          <button
                            className='group-hover:ring-dark-primary-500 dark:ring-offset-dark-muted-900 inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-transparent transition-all duration-300 group-hover:ring-offset-4 nui-focus'
                            id='headlessui-menu-button-209'
                            aria-haspopup='menu'
                            aria-expanded='false'
                          >
                            <div className='relative inline-flex h-9 w-9 items-center justify-center rounded-full'>
                              <img
                                src={
                                  true
                                    ? 'https://tairo.cssninja.io/img/avatars/2.svg'
                                    : 'https://tairo.cssninja.io/img/avatars/2.svg'
                                }
                                className='max-w-full rounded-full object-cover shadow-sm dark:border-transparent'
                              />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* main starts here */}
                  <main>
                    <div className='nuxt-loading-indicator fixed top-0 right-0 left-0 pointer-events-none w-auto h-3 opacity-0 bg-dark-primary-500 bg-size-[Infinity%] bg-no-repeat transform scaleX-0 transform-origin-left transition-transform duration-100 transition-height duration-400 transition-opacity z-999999'></div>
                    <div></div>
                    <div>{children}</div>
                  </main>
                </div>
              </div>
            </div>

            {/* ******************************** This is CircularMenuComponent ******************************** */}
            {scrollPosition > 50 && (
              <CircularMenu
                toggleTheme={theme}
                handleThemeToggle={handleThemeToggle}
              />
            )}

            {/* ******************************** This is Chat Button Component ******************************** */}
            {/* <Chat isChatOpen={isChatOpen} handleToggleChat={handleToggleChat} /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;

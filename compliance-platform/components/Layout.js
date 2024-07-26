"use client";
import { useEffect, useState } from "react";
import CircularMenu from "@/components/CircularMenu";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { useTheme } from "next-themes";
import { isEmpty, Store, useAuth } from "@/shared";
import { Button, Input } from "antd";
import { Provider } from "react-redux";
import Navbar from "./Navbar";
// import LoginImage from "@/assets/image.png"

const Layout = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const { isValidToken, login, logout, setIsValidToken, token } = useAuth();
  
  // **************** All States ****************
  const [isSideBar, setIsSideBar] = useState(true); // state for Sidebar visibility
  const [scrollPosition, setScrollPosition] = useState(0); // state for scroll position
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // **************** All useEffects ****************
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // **************** All Functions ****************
  //1. For handling sidebar visibility
  const handleToggleSideBar = () => {
    setIsSideBar(!isSideBar);
  };

  //2. For toggling theme
  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
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
      errorObject = { ...errorObject, email: "Email is required" };
    }
    // Validate password
    if (isEmpty(pass) || !pass.trim()) {
      errorObject = { ...errorObject, pass: "Password is required." };
    }
    // If there are errors, set them and return
    if (errorObject?.email != null || errorObject?.pass != null) {
      setIsLoading(false);
      return setError(errorObject);
    }

    const userData = await login(email, pass);
    console.log("userData: ", userData);
    if (!userData.success) {
      errorObject = { ...errorObject, message: userData.message };
      setIsLoading(false);
      return setError(errorObject);
    }
    setIsValidToken(userData.user);
    setIsLoading(false);
  }

  return (
    <Provider store={Store}>
        {!isValidToken ? (
          <div className="flex flex-col sm:flex-row h-screen w-screen overflow-y-hidden">
            <div className="flex justify-center items-center sm:hidden h-24 w-full">
              <img src="/logow.svg" alt="logo" className="w-20 py-1" />
            </div>
            <div className="w-screen sm:w-1/2 flex flex-col justify-center items-center">
              <div className="flex flex-col items-center mt-12">
                <h3 className="text-2xl font-semibold mb-2">Sign In</h3>
                <h5 className="font-medium mb-6 text-gray-500">
                  Your Admin Dashboard Awaits!
                </h5>
                <Input
                  className="mb-4 px-4 py-3 w-80 text-black border border-gray-300 rounded-lg outline-none focus:border-green-500"
                  id="text"
                  name="text"
                  placeholder="name@example.com"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="text"
                  autoCorrect="off"
                  disabled={isLoading}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  className="mb-4 px-4 py-3 w-80 text-black border border-gray-300 rounded-lg outline-none focus:border-green-500"
                  id="pass"
                  name="pass"
                  placeholder="*********"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  disabled={isLoading}
                  onChange={(e) => setPass(e.target.value)}
                />
                <p>
                  {error?.pass ? (
                    <span className="text-red-600 text-xs">{error?.pass}</span>
                  ) : null}
                </p>
                <p className="flex justify-end w-full text-sm font-medium dark:text-dark-primary text-light-primary mb-5">
                  <a href="#!">Forgot password?</a>
                </p>
                <Button
                  type="primary"
                  loading={isLoading}
                  onClick={onSubmit}
                  className="mb-4 px-5 py-3 w-80 h-12 bg-light-primary text-white rounded-lg"
                >
                  Login
                </Button>
                <p>
                  {error?.message ? (
                    <span className="text-red-600 text-xs">
                      {error?.message}
                    </span>
                  ) : null}
                </p>
              </div>
            </div>

            <div className="w-1/2 hidden sm:block">
              <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                  <Image
                    src="/logo.png"
                    width={200}
                    height={200}
                    alt="Authentication"
                    className="dark:block"
                  />
                </div>
                <div className="relative z-20 mt-auto">
                  <blockquote className="space-y-2">
                    <p className="text-lg">
                      &ldquo;It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout.&rdquo;
                    </p>
                    <footer className="text-sm">Zain</footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div id="__nuxt">
            <div>
              <div className="bg-light-muted-100 dark:bg-dark-muted-900 pb-20">
                {/* ******************************** This is the Sidebar ********************************   */}
                <Sidebar
                  isSideBar={isSideBar}
                  handleToggleSideBar={handleToggleSideBar}
                />

                {/* ******************************** This is the body *********************************/}
                <div
                  className={`bg-muted-100 dark:bg-muted-900 relative min-h-screen w-full overflow-x-hidden px-4 transition-all duration-300 xl:px-10 ${
                    isSideBar
                      ? "xl:max-w-[calc(100%_-_200px)] xl:ms-[200px]"
                      : "xl:max-w-[calc(100%_-_40px)] xl:ms-[40px]"
                  }`}
                >
                  <div className="mx-auto w-full max-w-[90rem]">
                    {/* ******************************* Header ***************************** */}
                    <Navbar
                      token={token}
                      isSideBar={isSideBar}
                      handleToggleSideBar={handleToggleSideBar}
                      theme={theme}
                      handleThemeToggle={handleThemeToggle}
                      logout={logout}
                    />
                    {/* main starts here */}
                    <main>
                      <div className="nuxt-loading-indicator fixed top-0 right-0 left-0 pointer-events-none w-auto h-3 opacity-0 bg-dark-primary-500 bg-size-[Infinity%] bg-no-repeat transform scaleX-0 transform-origin-left transition-transform duration-100 transition-height duration-400 transition-opacity z-999999"></div>
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
    </Provider>
  );
};

export default Layout;

'use client'
import { useState } from "react";

const CircularMenu = ({ toggleTheme, handleThemeToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div
      className={`after:bg-primary-600 after:shadow-primary-500/50 dark:after:shadow-muted-800/10 fixed end-[1em] top-[0.6em] z-[90] transition-transform duration-300 after:absolute after:end-0 after:top-0 after:block after:h-12 after:w-12 after:rounded-full after:shadow-lg after:transition-transform after:duration-300 after:content-[''] ${
        isMenuOpen &&
        "after:ease-[cubic-bezier(0.68, 1.55, 0.265, 1)] after:scale-[5.5]"
      }`}
    >
      <button
        type="button"
        onClick={toggleMenu}
        className="bg-primary-500 shadow-primary-500/50 dark:shadow-muted-800/10 relative z-30 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg"
      >
        <span
          className={`relative block h-3 w-3 transition-all duration-300 ${
            isMenuOpen ? "scale-90 top-0" : "-top-0.5"
          }`}
        >
          <span
            className={`bg-muted-50 absolute block h-0.5 w-full transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 top-1" : "top-0.5"
            }`}
          ></span>
          <span
            className={`bg-muted-50 absolute top-1/2 block h-0.5 w-full transition-all duration-300 ${
              isMenuOpen && "opacity-0 translate-x-4"
            }`}
          ></span>
          <span
            className={`bg-muted-50 absolute block h-0.5 w-full transition-all duration-300 ${
              isMenuOpen ? "rotate-45 bottom-1.5" : "bottom-0"
            }`}
          ></span>
        </span>
      </button>
      {isMenuOpen && (
        <div>
          <div className="absolute end-[0.2em] top-[0.2em] z-20 flex items-center justify-center transition-all duration-300 translate-x-[-6.5em] translate-y-[-0.25em]">
            <label className="nui-focus relative block h-9 w-9 shrink-0 overflow-hidden rounded-full transition-all duration-300 focus-visible:outline-2 ring-offset-muted-500 dark:ring-offset-muted-400 ms-auto">
              <input
                type="checkbox"
                onChange={handleThemeToggle}
                className="absolute start-0 top-0 z-[2] h-full w-full cursor-pointer opacity-0"
              />
              <span
                className={`${
                  toggleTheme === "light"
                    ? "bg-white border-muted-300"
                    : "bg-muted-800 border-muted-700"
                } relative block h-9 w-9 rounded-full`}
              >
                {toggleTheme === "light" ? (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="pointer-events-none absolute start-1/2 top-1/2 block h-5 w-5 text-yellow-400 transition-all duration-300 -translate-y-1/2 translate-x-[-50%] opacity-100 rtl:translate-x-[50%]"
                  >
                    <g
                      fill="currentColor"
                      stroke="currentColor"
                      className="stroke-2"
                    >
                      <circle cx="12" cy="12" r="5"></circle>
                      <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
                    </g>
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="pointer-events-none absolute start-1/2 top-1/2 block h-5 w-5 text-yellow-400 transition-all duration-300 -translate-y-1/2 translate-x-[-45%] opacity-100 rtl:translate-x-[45%]"
                  >
                    <path
                      fill="currentColor"
                      stroke="currentColor"
                      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                      className="stroke-2"
                    />
                  </svg>
                )}
              </span>
            </label>
          </div>
          {/* <div className="absolute end-[0.2em] top-[0.2em] z-20 flex items-center justify-center transition-all duration-300 translate-x-[-5.75em] translate-y-[3em]">
            <button
              type="button"
              className="bg-primary-700 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300"
            >
              <img
                className="h-7 w-7 rounded-full"
                src="https://tairo.cssninja.io/img/icons/flags/united-states-of-america.svg"
                alt="flag icon"
              />
            </button>
          </div> */}
          <div className="absolute end-[0.2em] top-[0.2em] z-20 flex items-center justify-center transition-all duration-300 translate-x-[-5em] translate-y-[4.5em]">
            <a
              aria-current="page"
              href="/dashboards/ecommerce#"
              className="router-link-active router-link-exact-active inline-flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300"
            >
              <span className="bg-primary-700 flex h-9 w-9 items-center justify-center rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="icon text-muted-400 h-5 w-5"
                  width="1em"
                  height="1em"
                  viewBox="0 0 256 256"
                  data-v-cd102a71=""
                >
                  <g fill="currentColor">
                    <path
                      d="M208 192H48a8 8 0 0 1-6.88-12C47.71 168.6 56 139.81 56 104a72 72 0 0 1 144 0c0 35.82 8.3 64.6 14.9 76a8 8 0 0 1-6.9 12Z"
                      opacity=".2"
                    ></path>
                    <path d="M221.8 175.94c-5.55-9.56-13.8-36.61-13.8-71.94a80 80 0 1 0-160 0c0 35.34-8.26 62.38-13.81 71.94A16 16 0 0 0 48 200h40.81a40 40 0 0 0 78.38 0H208a16 16 0 0 0 13.8-24.06ZM128 216a24 24 0 0 1-22.62-16h45.24A24 24 0 0 1 128 216Zm-80-32c7.7-13.24 16-43.92 16-80a64 64 0 1 1 128 0c0 36.05 8.28 66.73 16 80Z"></path>
                  </g>
                </svg>
              </span>
            </a>
          </div>
          <div className="absolute end-[0.2em] top-[0.2em] z-20 flex items-center justify-center transition-all duration-300 translate-x-[0em] translate-y-[6.5em]">
            <button
              type="button"
              className="bg-primary-700 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="icon text-muted-400 h-5 w-5"
                width="1em"
                height="1em"
                viewBox="0 0 256 256"
                data-v-cd102a71=""
              >
                <g fill="currentColor">
                  <path
                    d="M112 80a32 32 0 1 1-32-32a32 32 0 0 1 32 32Zm64 32a32 32 0 1 0-32-32a32 32 0 0 0 32 32Zm-96 32a32 32 0 1 0 32 32a32 32 0 0 0-32-32Zm96 0a32 32 0 1 0 32 32a32 32 0 0 0-32-32Z"
                    opacity=".2"
                  ></path>
                  <path d="M80 40a40 40 0 1 0 40 40a40 40 0 0 0-40-40Zm0 64a24 24 0 1 1 24-24a24 24 0 0 1-24 24Zm96 16a40 40 0 1 0-40-40a40 40 0 0 0 40 40Zm0-64a24 24 0 1 1-24 24a24 24 0 0 1 24-24Zm-96 80a40 40 0 1 0 40 40a40 40 0 0 0-40-40Zm0 64a24 24 0 1 1 24-24a24 24 0 0 1-24 24Zm96-64a40 40 0 1 0 40 40a40 40 0 0 0-40-40Zm0 64a24 24 0 1 1 24-24a24 24 0 0 1-24 24Z"></path>
                </g>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CircularMenu;

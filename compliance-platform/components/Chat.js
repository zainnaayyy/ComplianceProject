const Chat = ({ isChatOpen, handleToggleChat }) => {
  return (
    <div id="__root" className="fixed end-[1em] bottom-[0.6em] z-[90]">
      <div
        part="chatButton"
        onClick={handleToggleChat}
        className="flex justify-center items-center rounded-full shadow-frame shrink-0 bg-primary h-14 w-14 cursor-pointer select-none ease-in-out transition-all duration-100 hover:scale-110 active:scale-90 start-user-defined bottom-user-defined mb-safe xs:bottom-0 xs:start-0 xs:relative pointer-events-auto"
      >
        {!isChatOpen ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            title="Open"
            className="w-6 h-6 drop-shadow-focused text-white light-action:text-default"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.1293 22C20.0293 22 19.9293 21.9893 19.8293 21.9653L13.4493 20.4893C12.9467 20.56 12.4693 20.5947 12 20.5947C6.48533 20.5947 2 16.424 2 11.2973C2 6.17067 6.48533 2 12 2C17.5146 2 22 6.17067 22 11.2973C22 13.448 21.22 15.4867 19.784 17.1347L21.3106 20.048C21.5533 20.5093 21.504 21.0693 21.184 21.4827C20.9293 21.8133 20.5373 22 20.1293 22Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            title="Close"
            className="w-6 h-6 drop-shadow-focused text-white light-action:text-default"
          >
            <path
              d="M19.0711 9.46445L12 16.5355L4.92894 9.46445"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Chat;

const MenuButton = ({ open, handleClick }) => {
  return (
    <div className="fixed p-4 right-0 rounded-bl-md top-0 z-50 bg-bg-gray sm:hidden">
      <div
        onClick={handleClick}
        className={`flex flex-col w-12 h-12 justify-between bg-transparent cursor-pointer transition-all duration-300${
          open ? ' transform -rotate-45' : ''
        }`}
        aria-label="Menu toggle button"
      >
        <div
          className={`bg-blue-500 dark:bg-blue-200 rounded w-6 h-1.5 transition-all duration-300 origin-right self-end ${
            open ? ' transform -rotate-90 -translate-x-6 -translate-y-1' : ''
          }`}
        ></div>
        <div className="bg-blue-500 dark:bg-blue-200 rounded w-12 h-1.5 transition-all duration-300"></div>
        <div
          className={`bg-blue-500 dark:bg-blue-200 rounded w-6 h-1.5 transition-all duration-300 origin-left ${
            open ? ' transform -rotate-90 translate-x-6 translate-y-1' : ''
          }`}
        ></div>
      </div>
      <div className="fixed -top-12 -right-2 w-60 h-70 bg-blue-800 rounded-bl-lg"></div>
    </div>
  );
};

export default MenuButton;

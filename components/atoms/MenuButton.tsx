// type MenuButtonProps = {
//   open: boolean;
//   handleClick: (event:MouseEvent<HTMLDivElement, MouseEvent>) => void;
// };

const MenuButton = ({ open, handleClick }): JSX.Element => {
  return (
    <div className="fixed right-4 top-4 z-20 sm:hidden">
      <div
        onClick={handleClick}
        className={`flex flex-col w-16 h-16 justify-between bg-transparent cursor-pointer transition-all duration-300${
          open ? ' transform -rotate-45' : ''
        }`}
        aria-label="Menu toggle button"
      >
        <div
          className={`bg-blue-200 rounded w-8 h-1.5 transition-all duration-300 origin-right self-end${
            open ? ' transform -rotate-90 -translate-x-8 -translate-y-1' : ''
          }`}
        ></div>
        <div className="bg-blue-200 rounded w-16 h-1.5 transition-all duration-300"></div>
        <div
          className={`bg-blue-200 rounded w-8 h-1.5 transition-all duration-300 origin-left${
            open ? ' transform -rotate-90 translate-x-8 translate-y-1' : ''
          }`}
        ></div>
      </div>
      <div className="fixed -top-12 -right-2 w-60 h-70 bg-blue-800 rounded-bl-lg"></div>
    </div>
  );
};

export default MenuButton;

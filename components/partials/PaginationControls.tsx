import { IconButton, Button } from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const PaginationControls = ({ pages, currentPage, handleClick }) => {
  const buttonsArr = [];
  for (let i = 0; i < pages; i++) {
    buttonsArr[i] = i + 1;
  }
  return (
    <div className="w-full flex flex-row justify-center">
      <IconButton
        key="prevPage"
        aria-label="Previous page"
        isDisabled={currentPage === 1}
        className="mx-1"
        icon={<FaArrowLeft />}
        colorScheme="blue"
        variant="solid"
        size="xs"
        onClick={() => handleClick('prevPage')}
      ></IconButton>
      {buttonsArr.map((el) => {
        return (
          <Button
            key={el}
            aria-label={`${el} page`}
            isDisabled={currentPage === el}
            className="mx-1"
            colorScheme="blue"
            variant="solid"
            size="xs"
            onClick={() => handleClick(el)}
          >
            {el}
          </Button>
        );
      })}
      <IconButton
        key="nextPage"
        aria-label="Next page"
        isDisabled={currentPage === pages}
        className="mx-1"
        icon={<FaArrowRight />}
        colorScheme="blue"
        variant="solid"
        size="xs"
        onClick={() => handleClick('nextPage')}
      ></IconButton>
    </div>
  );
};

export default PaginationControls;

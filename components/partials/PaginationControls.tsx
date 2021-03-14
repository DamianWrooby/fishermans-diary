import { Button } from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const PaginationControls = ({ pages, currentPage, handleClick }) => {
  const buttonsArr = [];
  for (let i = 0; i < pages; i++) {
    buttonsArr[i] = i + 1;
  }
  return (
    <div className="w-full flex flex-row justify-center">
      <Button
        key="prevPage"
        isDisabled={currentPage === 1}
        className="mx-1"
        leftIcon={<FaArrowLeft />}
        colorScheme="blue"
        variant="outline"
        size="xs"
        onClick={() => handleClick('prevPage')}
      ></Button>
      {buttonsArr.map((el) => {
        return (
          <Button
            key={el}
            isDisabled={currentPage === el}
            className="mx-1"
            colorScheme="blue"
            variant="outline"
            size="xs"
            onClick={() => handleClick(el)}
          >
            {el}
          </Button>
        );
      })}
      <Button
        key="nextPage"
        isDisabled={currentPage === pages}
        className="mx-1"
        rightIcon={<FaArrowRight />}
        colorScheme="blue"
        variant="outline"
        size="xs"
        onClick={() => handleClick('nextPage')}
      ></Button>
    </div>
  );
};

export default PaginationControls;

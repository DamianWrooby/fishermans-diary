import { IconButton } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

const CatchButton = (): JSX.Element => {
  return (
    <a href="/catches/add-catch">
      <div className="absolute m-16 bottom-0 right-0">
        <IconButton
          aria-label="Add catch"
          icon={<FaPlus />}
          colorScheme="red"
          borderRadius="50px"
          size="lg"
        />
      </div>
    </a>
  );
};

export default CatchButton;

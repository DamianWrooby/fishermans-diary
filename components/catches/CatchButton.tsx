import Link from 'next/link';

import { IconButton } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CatchButton = () => {
  return (
    <Link href="/catches/add-catch">
      <a title="Add catch" href="/catches/add-catch">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed m-6 sm:m-16 bottom-0 right-0"
        >
          <IconButton
            aria-label="Add catch"
            icon={<FaPlus />}
            colorScheme="red"
            borderRadius="50px"
            size="lg"
          />
        </motion.div>
      </a>
    </Link>
  );
};

export default CatchButton;

import { useRouter } from 'next/router';
import { IconButton } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { db } from '../../services/firebase';
import { useAuth } from '../../contexts/authContext';

// const addCatch = () => {
//   console.log(uid);
//   await db.collection('catches').add({
//     author_uid: uid,
//     bait: 'robal',
//     fish: 'catfish',
//     spot: 'lake spot location data',
//   });
// };

const CatchButton = (): JSX.Element => {
  const router = useRouter();
  const user = useAuth();
  return (
    <a href="/catches/addcatch">
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

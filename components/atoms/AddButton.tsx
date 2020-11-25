import { IconButton } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { db } from '../../services/firebase';
import { useAuth } from '../../contexts/authContext';

type addButtonReturn = React.ReactNode;

const addCatch = async (uid) => {
  console.log(uid);
  await db.collection('catches').add({
    author_uid: uid,
    bait: 'robal',
    fish: 'catfish',
    spot: 'lake spot location data',
  });
};

const AddButton = (): addButtonReturn => {
  const user = useAuth();
  return (
    <div className="absolute m-16 bottom-0 right-0">
      <IconButton
        aria-label="Add catch"
        icon={<FaPlus />}
        colorScheme="red"
        borderRadius="50px"
        size="lg"
        onClick={() => addCatch(user.data.uid)}
      />
    </div>
  );
};

export default AddButton;

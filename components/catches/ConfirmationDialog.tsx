import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';

type ConfirmationDialogProps = {
  handleIsOpen: boolean;
  handleAction: () => void;
  handleOnClose: () => void;
  text: string;
  confirmButtonText: string;
  cancelButtonText: string;
};

const ConfirmationDialog = ({
  handleIsOpen,
  handleAction,
  handleOnClose,
  text,
  confirmButtonText,
  cancelButtonText,
}: ConfirmationDialogProps) => {
  return (
    <Modal isOpen={handleIsOpen} onClose={handleOnClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{text}</ModalHeader>
        <ModalCloseButton />
        <ModalBody margin="auto">
          <ButtonGroup marginBottom="1rem" variant="outline" spacing="6">
            <Button
              onClick={handleAction}
              borderColor="red.400"
              color="red.400"
            >
              {confirmButtonText}
            </Button>
            <Button onClick={handleOnClose}>{cancelButtonText}</Button>
          </ButtonGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationDialog;

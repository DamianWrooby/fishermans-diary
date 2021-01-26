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

const ConfirmationDialog = ({
  handleIsOpen,
  handleAction,
  handleOnClose,
  text,
  confirmButtonText,
  cancelButtonText,
}): JSX.Element => {
  return (
    <Modal isOpen={handleIsOpen} onClose={handleOnClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{text}</ModalHeader>
        <ModalCloseButton />
        <ModalBody margin="auto">
          <ButtonGroup marginBottom="1rem" variant="outline" spacing="6">
            <Button onClick={handleAction} colorScheme="red">
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

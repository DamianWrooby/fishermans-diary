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

type ErrorDialogProps = {
  handleIsOpen: boolean;
  handleAction: () => void;
  handleOnClose: () => void;
  text: string;
  buttonText: string;
};

const ErrorDialog = ({
  handleIsOpen,
  handleAction,
  handleOnClose,
  text,
  buttonText,
}: ErrorDialogProps) => {
  return (
    <Modal isOpen={handleIsOpen} onClose={handleOnClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <div className="text-center">
          <ModalHeader>{text}</ModalHeader>
        </div>
        <ModalCloseButton />
        <ModalBody margin="auto">
          <ButtonGroup marginBottom="1rem" variant="outline" spacing="6">
            <Button
              onClick={handleAction}
              borderColor="blue.300"
              color="blue.300"
            >
              {buttonText}
            </Button>
          </ButtonGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ErrorDialog;

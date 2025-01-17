import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { RefObject } from 'react';
import { DeletePostButton } from '../../button/deletePost';

interface InitialFocusModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialRef: RefObject<HTMLInputElement>;
    finalRef: RefObject<HTMLButtonElement>;
    selectedPostId: number | null;
}

function DeleteModal({ isOpen, onClose, initialRef, finalRef, selectedPostId }: InitialFocusModalProps) {

    return (
        <>
            <Modal
                onClose={onClose}
                isOpen={isOpen}
                finalFocusRef={finalRef}
                initialFocusRef={initialRef}>
                <ModalOverlay />
                <ModalContent bgColor={'home.background'} color={'home.text'}>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to delete this post?
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <DeletePostButton postId={selectedPostId} onSuccess={onClose} />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteModal
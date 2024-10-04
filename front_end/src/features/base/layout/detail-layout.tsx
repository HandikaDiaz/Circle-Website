
import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { RefObject } from "react";
import { DetailImage } from "../component/page-detail/detail-image";
import { DetailRightNavbar } from "../component/page-detail/detail-right-nav";

interface InitialFocusModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialRef: RefObject<HTMLInputElement>;
    finalRef: RefObject<HTMLButtonElement>;
    selectedImage: string | null;
    selectedPostId: number | null;
}

export function DetailLayout({ isOpen, onClose, initialRef, finalRef, selectedImage, selectedPostId }: InitialFocusModalProps) {
    return (
        <>
            <Modal
                onClose={onClose}
                isOpen={isOpen}
                finalFocusRef={finalRef}
                initialFocusRef={initialRef}>
                <ModalOverlay
                    backdropFilter="blur(10px)"
                    backgroundColor="rgba(128, 128, 128,0.1)" />

                <ModalContent
                    minW="80%"
                    overflow="auto"
                    background="#1D1D1D">
                    <ModalBody>
                        <ModalCloseButton
                            left={2}
                            width="20px"
                            height="20px"
                            rounded="full"
                            fontSize={"7px"}
                            color="home.link"
                            fontWeight={"bold"}
                            border="1.5px solid #909090" />
                        <Box display={'flex'} width={'100%'} height={'130vh'}>
                            <Box flex={2} overflowY={'auto'} borderRight={'1px solid #545454'}>
                                <DetailImage selectedImage={selectedImage}/>
                            </Box>
                            <Box flex={1.4} overflowX={'auto'}>
                                <DetailRightNavbar selectedPostId={selectedPostId} />
                            </Box>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
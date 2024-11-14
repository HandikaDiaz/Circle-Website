// import {  } from "@chakra-ui/modal";
import { Avatar, Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Textarea } from "@chakra-ui/react";
import { RefObject } from "react";
import { LuImagePlus } from "react-icons/lu";
import { usePost } from "../../hooks/use-post";
import { ErrorMessage } from "../../../auth/schemas/error";
import { useUser } from "../../hooks/use-user";

interface InitialFocusModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialRef: RefObject<HTMLInputElement>;
    finalRef: RefObject<HTMLButtonElement>;
}

export function PostModal({ isOpen, onClose, initialRef, finalRef }: InitialFocusModalProps) {
    const { register, handleSubmit, errors, onSubmit } = usePost();
    const { data } = useUser();
    
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
                    minW="45vw"
                    mt={"140px"}
                    overflow="auto"
                    background="#1D1D1D"
                    borderRadius={"15px"}>
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                        <ModalBody pb={6}>
                            <Box>testerr</Box>
                            <Box
                                mb="10px"
                                mt={'10px'}
                                width="100%"
                                display="flex">

                                <ModalCloseButton
                                    width="20px"
                                    height="20px"
                                    m={"5px 2px"}
                                    rounded="full"
                                    fontSize={"7px"}
                                    color="home.link"
                                    fontWeight={"bold"}
                                    border="1.5px solid #909090" />
                            </Box>

                            <FormControl display="flex">
                                <Avatar src={data?.image}></Avatar>

                                <Textarea
                                    width="100%"
                                    resize="none"
                                    color="white"
                                    height={"150px"}
                                    {...register('content')}
                                    border="1px solid transparent"
                                    placeholder="What Is Happening?!"
                                    _focusVisible={{
                                        borderColor: "transparent",
                                    }}
                                    _hover={{
                                        borderColor: "transparent",
                                    }} />
                            </FormControl>
                        </ModalBody>

                    <ModalFooter
                        display="flex"
                        borderTop="1px solid grey"
                        justifyContent="space-between">
                        <FormControl>
                            <FormLabel
                                width={'30px'}
                                display={'flex'}
                                cursor={'pointer'}
                                color={'home.button.hoverText'}
                                fontSize={'30px'}><LuImagePlus /></FormLabel>
                            <Input type='file' {...register('image')} hidden name="image"/>
                            <ErrorMessage message={errors.image?.message || ''} />
                        </FormControl>
                        <Button
                            border={'none'}
                            type="submit"
                            height={'30px'}
                            fontSize={'14px'}
                            cursor={'pointer'}
                            fontWeight={'bold'}
                            transition={'0.3s'}
                            padding={'5px 30px'}
                            borderRadius={'15px'}
                            color={'home.button.text'}
                            backgroundColor={'home.button.background'}
                            _hover={{ backgroundColor: 'home.button.hoverBackground', color: 'home.button.hoverText' }}>Post</Button>
                    </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}


// import {  } from "@chakra-ui/modal";
import { Avatar, Box, Button, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Text, Textarea } from "@chakra-ui/react";
import { RefObject } from "react";
import { ErrorMessage } from "../../../auth/schemas/error";
import { useUser } from "../../hooks/use-user";

interface InitialFocusModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialRef: RefObject<HTMLInputElement>;
    finalRef: RefObject<HTMLButtonElement>;
}

export function ProfileModal({ isOpen, onClose, initialRef, finalRef }: InitialFocusModalProps) {
    const { register, handleSubmit, errors, onSubmit, data } = useUser();
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
                    overflow="auto"
                    background="#1D1D1D"
                    borderRadius={"15px"}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody pb={6}>
                            <Box
                                mb="10px"
                                mt={'5px'}
                                width="100%"
                                display="flex">
                                <Text fontWeight={'bold'} color={'home.text'}>Edit Profile</Text>

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

                            <Box>
                                <FormControl>
                                    <FormLabel>
                                        <Image
                                            width={'100%'}
                                            height={'125px'}
                                            display={'block'}
                                            cursor={'pointer'}
                                            borderRadius='10px'
                                            src={data?.background} />
                                    </FormLabel>
                                    <Input type='file' {...register('background')} hidden name="background" width={'1px'}/>
                                </FormControl>
                                <Box
                                    mt={'-35px'}
                                    display={'flex'}
                                    alignItems={'center'}>


                                    <FormControl>
                                        <FormLabel
                                            display={'flex'}
                                            width={'1px'}
                                            fontSize={'30px'}
                                            cursor={'pointer'}
                                            color={'home.button.hoverText'}>
                                            <Avatar
                                                ms={'20px'}
                                                boxSize='80px'
                                                display={'block'}
                                                borderRadius='500px'
                                                border={'3px solid black'}
                                                src={data?.image} />
                                        </FormLabel>
                                        <Input type='file' {...register('image')} hidden name="image" width={'1px'}/>
                                        <ErrorMessage message={errors.image?.message || ''} />
                                    </FormControl>
                                </Box>

                                <Box>
                                    <FormControl color={'home.text'}>
                                        <FormLabel
                                            mt={'15px'}
                                            p={'10px'}
                                            fontSize={'16px'}
                                            color={'home.modal'}
                                            borderRadius={'7px'}
                                            border={'1px solid #545454'} >Name
                                            <Input
                                                type="text"
                                                mt={'-10px'}
                                                ms={'-14px'}
                                                border={'none'}
                                                fontSize={'14px'}
                                                color={'home.text'}
                                                {...register("fullName")}
                                                defaultValue={data?.fullName}
                                                _focusVisible={{
                                                    borderColor: "transparent",
                                                }}
                                                _hover={{
                                                    borderColor: "transparent",
                                                }}></Input>
                                        </FormLabel>
                                        <FormLabel
                                            mt={'15px'}
                                            p={'10px'}
                                            fontSize={'16px'}
                                            color={'home.modal'}
                                            borderRadius={'7px'}
                                            border={'1px solid #545454'} >Username
                                            <Input
                                                type="text"
                                                mt={'-10px'}
                                                ms={'-14px'}
                                                border={'none'}
                                                fontSize={'14px'}
                                                color={'home.text'}
                                                {...register("userName")}
                                                defaultValue={data?.userName}
                                                _focusVisible={{
                                                    borderColor: "transparent",
                                                }}
                                                _hover={{
                                                    borderColor: "transparent",
                                                }}></Input>
                                        </FormLabel>
                                        <FormLabel
                                            mt={'15px'}
                                            p={'10px'}
                                            fontSize={'16px'}
                                            color={'home.modal'}
                                            borderRadius={'7px'}
                                            border={'1px solid #545454'} >Bio
                                            <Textarea
                                                mt={'-10px'}
                                                ms={'-14px'}
                                                resize={'none'}
                                                border={'none'}
                                                fontSize={'14px'}
                                                value={data?.bio}
                                                color={'home.text'}
                                                {...register("bio")}
                                                _focusVisible={{
                                                    borderColor: "transparent",
                                                }}
                                                _hover={{
                                                    borderColor: "transparent",
                                                }}></Textarea>
                                        </FormLabel>
                                    </FormControl>
                                </Box>
                            </Box>
                        </ModalBody>

                        <ModalFooter
                            me={"12 ;px"}
                            display="flex"
                            justifyContent="end"
                            borderTop="1px solid grey">
                            <Button
                                type="submit"
                                border={'none'}
                                height={'30px'}
                                fontSize={'14px'}
                                cursor={'pointer'}
                                fontWeight={'bold'}
                                transition={'0.3s'}
                                padding={'5px 30px'}
                                borderRadius={'15px'}
                                color={'home.button.text'}
                                backgroundColor={'home.button.background'}
                                _hover={{ backgroundColor: 'home.button.hoverBackground', color: 'home.button.hoverText' }}>Save</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}


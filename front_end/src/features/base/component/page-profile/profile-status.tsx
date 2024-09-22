
import { Box, Button, HStack, Image, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { usePostForm } from "../../hooks/use.post.form";
import { ProfileModal } from "../modal/profile-modal";

export function ProfileStatus() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const { data } = usePostForm();

    return (
        <Box
            mt={'10px'}
            px={'25px'}
            alignItems={'center'}>
            <Image
                width={'100%'}
                height={'100px'}
                display={'block'}
                borderRadius='10px'
                src='https://wallpapercave.com/wp/wp4566576.jpg' />

            <Box
                mt={'-35px'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}>
                <Image
                    ms={'20px'}
                    boxSize='80px'
                    display={'block'}
                    borderRadius='500px'
                    border={'3px solid black'}
                    src='https://bit.ly/dan-abramov' />

                <Button
                    mt={'45px'}
                    width={'25%'}
                    height={'28px'}
                    onClick={onOpen}
                    fontSize={'10px'}
                    fontWeight={'700'}
                    bg={'transparent'}
                    borderRadius={'20px'}
                    color={'home.button.text'}
                    border={'1px solid #FFFFFF'}>Edit Profile</Button>
            </Box>

            <Box
                mt={'10px'}
                color={'home.title'}
                bg={'transparent'}>
                {data && data.length > 0 &&
                    <Text
                        fontSize="16px"
                        fontWeight="bold"
                        bg={'transparent'}>✨ {data[0].author.fullName} ✨</Text>}

                {data && data.length > 0 &&
                    <Text
                        my={'1'}
                        fontSize="13px"
                        color={'home.link'}
                        bg={'transparent'}>@{data[0].author.userName}</Text>}

                {data && data.length > 0 &&
                    <Text
                        my="1"
                        fontSize="13px"
                        bg={'transparent'}>{data[0].author.bio}</Text>}

                <HStack bg={'transparent'}>
                    {data && data.length > 0 &&
                        <Text
                            fontSize="13px"
                            bg={'transparent'}>{data[0].author.following}
                            <Text
                                as={'span'}
                                color={'home.link'}
                                bg={'transparent'}> Following</Text></Text>}
                    {data && data.length > 0 &&
                        <Text
                            fontSize="13px"
                            bg={'transparent'}>{data[0].author.followers}
                            <Text
                                as={'span'}
                                color={'home.link'}
                                bg={'transparent'}> Followers</Text></Text>}
                </HStack>
            </Box>
            <ProfileModal
                isOpen={isOpen}
                onClose={onClose}
                initialRef={initialRef}
                finalRef={finalRef} />
        </Box>
    )
}

function useUserForm(): { data: any; } {
    throw new Error("Function not implemented.");
}

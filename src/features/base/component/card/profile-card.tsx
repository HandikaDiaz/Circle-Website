import { Box, Button, Card, Heading, HStack, Image, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { ButtonLink } from "../../link/link";
import { ProfileModal } from "../modal/profile-modal";


export function ProfileCard() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    
    return (
        <Card
            mx={'auto'}
            mt={'20px'}
            width={'90%'}
            paddingBottom={'20px'}
            borderRadius={'5px'}
            backgroundColor={'nav.background'}>
            <Box
                mx={'auto'}
                width={'90%'}>
                <Heading
                    mb={'10px'}
                    color={'nav.text'}>
                    <ButtonLink color={'nav.title2'} bg={'none'} textDecoration={'none'} fontSize={'23px'} to={"/profile"}>My Profile</ButtonLink>
                </Heading>

                <Image
                    width={'100%'}
                    height={'100px'}
                    display={'block'}
                    borderRadius='10px'
                    src='https://wallpapercave.com/wp/wp4566576.jpg'/>

                <Image
                    top={'115px'}
                    left={'30px'}
                    boxSize='73px'
                    display={'block'}
                    borderRadius='500px'
                    position={'absolute'}
                    border={'3px solid black'}
                    src='https://bit.ly/dan-abramov' />

                <Button
                    width={'25%'}
                    top={'159px'}
                    right={'20px'}
                    height={'28px'}
                    onClick={onOpen}
                    fontSize={'10px'}
                    color={'nav.text'}
                    fontWeight={'700'}
                    bg={'transparent'}
                    borderRadius={'20px'}
                    position={'absolute'}
                    border={'1px solid #FFFFFF'}>Edit Profile</Button>

                <Box
                    marginTop={'43px'}
                    marginLeft={'10px'}
                    color={'nav.text'}
                    bg={'transparent'}>
                    <Text
                        bg={'transparent'}
                        fontWeight="bold"
                        fontSize="14px">✨ Stella Audhina ✨</Text>

                    <Text
                        bg={'transparent'}
                        color={'nav.link'}
                        fontSize="11px">@audhinaha</Text>

                    <Text
                        bg={'transparent'}
                        fontSize="11px">Picked over by the worms, and weird fishes.</Text>

                    <HStack bg={'transparent'}>
                        <Text fontSize="11px" bg={'transparent'}>291 <Text color={'nav.link'} as={'span'} bg={'transparent'}>Following</Text></Text>
                        <Text fontSize="11px" bg={'transparent'}>23 <Text color={'nav.link'} as={'span'} bg={'transparent'}>Followers</Text></Text>
                    </HStack>
                </Box>
            </Box>

            <ProfileModal
                isOpen={isOpen}
                onClose={onClose}
                initialRef={initialRef}
                finalRef={finalRef} />
        </Card>
    )
}
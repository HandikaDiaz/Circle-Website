import { Box, Button, Image, Text } from "@chakra-ui/react";
import { ButtonLink } from "../../link/link";


export function AccFollowCard() {
    return (
        <Box 
            mt={'13px'}
            bg={'none'}
            display={'flex'} 
            alignItems={'center'}
            justifyContent={'space-between'}>
                <Box 
                    display={'flex'} 
                    bg={'none'}
                    alignItems={'center'} >
                    <Image
                            alt=''
                            top={'115px'}
                            left={'30px'}
                            boxSize='40px'
                            display={'block'}
                            borderRadius='500px'
                            src='https://bit.ly/dan-abramov' />

                    <ButtonLink textDecoration={'none'} to={"/profile-people"} bg={'none'}>
                    <Text 
                        as={'p'} 
                        ms={'10px'} 
                        color={'nav.text'} 
                        fontSize={'12px'} 
                        fontWeight={'bold'}>Handika
                        <Text 
                            fontSize={'10px'} 
                            color={'nav.link'}>@Handika</Text>
                    </Text>
                    </ButtonLink>
                </Box>
                <Box bg={'none'}>
                    <Button
                        height={'28px'}
                        color={'nav.text'}
                        fontSize={'10px'}
                        bg={'transparent'}
                        fontWeight={'700'}
                        padding={'5px 13px'}
                        borderRadius={'20px'}
                        border={'1px solid #FFFFFF'}>Follow</Button>
                </Box>
        </Box>
    )
}
import { Box, Card, Text } from "@chakra-ui/react";
import { AiFillInstagram, AiOutlineGithub } from "react-icons/ai";
import { FaFacebook, FaLinkedin } from "react-icons/fa";


export function MetaCard() {
    return (
        <Card
            mx={'auto'}
            my={'20px'}
            width={'90%'}
            borderRadius={'5px'}
            paddingBottom={'20px'}
            backgroundColor={'nav.background'}>
            <Box
                mx={'auto'}
                width={'90%'}>
                <Text
                    as='p'
                    mt={'15px'}
                    bg={'#262626'}
                    display={'flex'}
                    fontSize={'14px'}
                    color={'nav.text'}>Developed by Handika • 
                        <AiOutlineGithub 
                            fontSize={'20px'} style={{marginLeft: '5px', color:'nav.link'}}/>
                        <FaLinkedin 
                            fontSize={'20px'} style={{marginLeft: '5px', color:'nav.link'}}/>
                        <FaFacebook 
                            fontSize={'20px'} style={{marginLeft: '5px', color:'nav.link'}}/>
                        <AiFillInstagram 
                            fontSize={'23px'} style={{marginLeft: '5px', color:'nav.link'}}/></Text>
                
                <Text
                    as='p'
                    display={'flex'}
                    fontSize={'10px'}
                    color={'nav.link'}>Powered By Dumbways Indonesia • #1 Coding Bootcamp</Text>
            </Box>
        </Card>
    )
}
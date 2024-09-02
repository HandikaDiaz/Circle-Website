import { Box, Text, Card } from "@chakra-ui/react";
import { AiFillInstagram, AiOutlineGithub } from "react-icons/ai";
import { FaFacebook, FaLinkedin } from "react-icons/fa";


export function MetaCard() {
    return (
        <Card
            mx={'auto'}
            mt={'20px'}
            width={'90%'}
            borderRadius={'5px'}
            paddingBottom={'20px'}
            backgroundColor={'#262626'}>
            <Box
                mx={'auto'}
                width={'90%'}
                bg={'#262626'}>
                <Text
                    as='p'
                    mt={'15px'}
                    bg={'#262626'}
                    display={'flex'}
                    fontSize={'14px'}
                    color={'#FFFFFF'}>Developed by Handika • 
                        <AiOutlineGithub 
                            fontSize={'20px'} style={{backgroundColor: '#262626', marginLeft: '5px', color:'#B2B2B2'}}/>
                        <FaLinkedin 
                            fontSize={'20px'} style={{backgroundColor: '#262626', marginLeft: '5px', color:'#B2B2B2'}}/>
                        <FaFacebook 
                            fontSize={'20px'} style={{backgroundColor: '#262626', marginLeft: '5px', color:'#B2B2B2'}}/>
                        <AiFillInstagram 
                            fontSize={'23px'} style={{backgroundColor: '#262626', marginLeft: '5px', color:'#B2B2B2'}}/></Text>
                
                <Text
                    as='p'
                    bg={'#262626'}
                    display={'flex'}
                    fontSize={'10px'}
                    color={'#B2B2B2'}>Powered By Dumbways Indonesia • #1 Coding Bootcamp</Text>
            </Box>
        </Card>
    )
}
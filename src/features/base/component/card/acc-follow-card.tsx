import { Box, Button, Image, Spacer, Text } from "@chakra-ui/react";


export function AccFollowCard() {
    return (
        <Box 
            mt={'13px'}
            bg={'#262626'} 
            display={'flex'} 
            alignItems={'center'}>
                <Box 
                    bg={'#262626'}
                    display={'flex'} 
                    alignItems={'center'} >
                    <Image
                            alt=''
                            top={'115px'}
                            left={'30px'}
                            boxSize='40px'
                            display={'block'}
                            borderRadius='500px'
                            src='https://bit.ly/dan-abramov' />

                    <Text 
                        as={'p'} 
                        ms={'10px'} 
                        bg={'#262626'} 
                        color={'#FFFFFF'} 
                        fontSize={'12px'} 
                        fontWeight={'bold'}>Handika
                        <Text 
                            bg={'#262626'} 
                            fontSize={'10px'} 
                            color={'#909090'}>@Handika</Text>
                    </Text>
                </Box>
                <Spacer bg={'#262626'}/>
                <Box bg={'#262626'}>
                    <Button
                        height={'28px'}
                        color={'#FFFFFF'}
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
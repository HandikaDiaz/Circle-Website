import { Box, Button, Image, Spacer, Text } from "@chakra-ui/react";

export function AccFollowingCard() {
    return (
        <Box bg={'#262626'} display={'flex'} alignItems={'center'} mt={'13px'}>
                    <Box display={'flex'} alignItems={'center'} bg={'#262626'}>

                    <Image
                        alt=''
                        top={'115px'}
                        left={'30px'}
                        boxSize='40px'
                        display={'block'}
                        borderRadius='500px'
                        src='https://bit.ly/dan-abramov' />

                    <Text as={'p'} fontSize={'12px'} bg={'#262626'} color={'#FFFFFF'} ms={'10px'} fontWeight={'bold'}>Handika
                        <Text fontSize={'10px'} bg={'#262626'} color={'#909090'}>@Handika</Text>
                    </Text>
                    </Box>
                    <Spacer bg={'#262626'}/>
                    <Box bg={'#262626'}>
                        <Button
                        padding={'5px 13px'}
                        height={'28px'}
                        color={'#FFFFFF'}
                        fontSize={'10px'}
                        fontWeight={'700'}
                        bg={'transparent'}
                        borderRadius={'20px'}
                        border={'1px solid #FFFFFF'}>Following</Button>
                    </Box>
                </Box>
    )
}
import { Box, Heading, HStack, Card, Button, Image, Text } from "@chakra-ui/react";


export function ProfileCard() {
    return (
        <Card
            mx={'auto'}
            mt={'20px'}
            width={'90%'}
            paddingBottom={'20px'}
            borderRadius={'5px'}
            backgroundColor={'#262626'}>
            <Box
                mx={'auto'}
                width={'90%'}
                bg={'#262626'}>
                <Heading
                    as='h3'
                    my={'15px'}
                    bg={'#262626'}
                    color={'#FFFFFF'}>My Profile</Heading>

                <Image
                    borderRadius='10px'
                    display={'block'}
                    width={'100%'}
                    height={'100px'}
                    src='https://wallpapercave.com/wp/wp4566576.jpg'
                    alt=''/>

                <Image
                    alt=''
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
                    color={'#FFFFFF'}
                    fontSize={'10px'}
                    fontWeight={'700'}
                    bg={'transparent'}
                    borderRadius={'20px'}
                    position={'absolute'}
                    border={'1px solid #FFFFFF'}>Edit Profile</Button>

                <Box
                    marginTop={'43px'}
                    marginLeft={'10px'}
                    color={'#FFFFFF'}
                    bg={'transparent'}>
                    <Text
                        bg={'transparent'}
                        fontWeight="bold"
                        fontSize="14px">✨ Stella Audhina ✨</Text>

                    <Text
                        bg={'transparent'}
                        color={'#909090'}
                        my={'5'}
                        fontSize="11px">@audhinaha</Text>

                    <Text
                        my="5"
                        bg={'transparent'}
                        fontSize="11px">Picked over by the worms, and weird fishes.</Text>

                    <HStack mt="4" bg={'transparent'}>
                        <Text fontSize="11px" bg={'transparent'}>291 <Text color={'#909090'} as={'span'} bg={'transparent'}>Following</Text></Text>
                        <Text fontSize="11px" bg={'transparent'}>23 <Text color={'#909090'} as={'span'} bg={'transparent'}>Followers</Text></Text>
                    </HStack>
                </Box>
            </Box>
        </Card>
    )
}
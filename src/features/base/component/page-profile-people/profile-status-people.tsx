
import { Box, Button, HStack, Image, Text } from "@chakra-ui/react";

export function ProfileStatusPeople() {
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
                src='https://wallpapercave.com/wp/wp4566576.jpg'/>

            <Box
                mt={'-35px'}
                display={'flex'} 
                alignItems={'center'} 
                justifyContent={'space-between'} >
                <Image
                    alt=''
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
                    color={'home.button.text'}
                    fontSize={'10px'}
                    fontWeight={'700'}
                    bg={'transparent'}
                    borderRadius={'20px'}
                    border={'1px solid #FFFFFF'}>Follow</Button>
            </Box>

            <Box
                mt={'10px'}
                color={'home.title'}
                bg={'transparent'}>
                <Text
                    fontSize="16px"
                    fontWeight="bold"
                    bg={'transparent'}>✨ Audhina ✨</Text>

                <Text
                    my={'1'}
                    fontSize="13px"
                    color={'home.link'}
                    bg={'transparent'}>@audhinaha</Text>

                <Text
                    my="1"
                    fontSize="13px"
                    bg={'transparent'}>Picked over by the worms, and weird fishes.</Text>

                <HStack bg={'transparent'}>
                    <Text 
                        fontSize="13px" 
                        bg={'transparent'}>291 
                        <Text 
                            as={'span'} 
                            color={'home.link'} 
                            bg={'transparent'}> Following</Text></Text>

                    <Text 
                        fontSize="13px" 
                        bg={'transparent'}>23 
                        <Text 
                            as={'span'} 
                            color={'home.link'} 
                            bg={'transparent'}> Followers</Text></Text>
                </HStack>
            </Box>
        </Box>
    )
}
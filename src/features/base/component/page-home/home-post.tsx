import { Box, Button, FormControl, FormLabel, Input, Image } from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";


export function HomePost() {
    return (
        <Box
            mt={'10px'}
            px={'25px'}
            pb={'20px'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            borderBottom={'1px solid #3F3F3F'}>
            <Box
                display={'flex'}
                alignItems={'center'}>
                <Image
                    alt=''
                    top={'115px'}
                    left={'30px'}
                    boxSize='40px'
                    display={'block'}
                    borderRadius='500px'
                    src='https://bit.ly/dan-abramov' />

                <Input
                    type='text'
                    ms={'13px'}
                    border={'none'}
                    width={'300px'}
                    height={'25px'}
                    fontSize={'14px'}
                    color={'home.text'}
                    fontWeight={'bold'}
                    placeholder="What is happening?!" 
                    _focusVisible={{
                        borderColor: "transparent",
                    }}
                    _hover={{
                        borderColor: "transparent",
                    }}/>
            </Box>

            <Box display={'flex'}>
                <FormControl>
                    <FormLabel
                        cursor={'pointer'}
                        display={'flex'}
                        color={'home.button.hoverText'}
                        fontSize={'25px'}><LuImagePlus /></FormLabel>
                    <Input type='file' hidden />
                </FormControl>

                <Button
                    padding={'5px 30px'}
                    border={'none'}
                    height={'30px'}
                    fontSize={'14px'}
                    color={'home.button.text'}
                    cursor={'pointer'}
                    fontWeight={'bold'}
                    borderRadius={'15px'}
                    backgroundColor={'home.button.background'}
                    transition={'0.3s'}
                    _hover={{ backgroundColor: 'home.button.hoverBackground', color: 'home.button.hoverText' }}>Post</Button>
            </Box>
        </Box>
    )
}
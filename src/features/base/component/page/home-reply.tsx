import { Box, Button, FormControl, FormLabel, Input, Image } from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";


export function HomeReply() {
    return(
        <Box 
            mt={'50px'} 
            width={'40%'} 
            display={'flex'} 
            color={'#FFFFFF'} 
            alignItems={'center'}
            justifyContent={'space-between'}>
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
                    fontSize={'12px'} 
                    color={'#FFFFFF'}
                    placeholder="Type your reply!" />
            </Box>

            <Box 
                ms={'10px'}
                display={'flex'} 
                alignItems={'center'}> 
                <FormControl me={'10px'}>
                    <FormLabel 
                        display={'flex'} 
                        color={'#005E0E'} 
                        fontSize={'25px'}><LuImagePlus /></FormLabel>

                    <Input type='file' hidden/>
                </FormControl>

                <Button
                    padding={'5px 20px'}
                    border={'none'}
                    height={'30px'}
                    fontSize={'14px'}
                    color={'#FFFFFF'}
                    cursor={'pointer'}
                    fontWeight={'bold'}
                    borderRadius={'15px'}
                    backgroundColor={'#005E0E'}
                    _hover={{backgroundColor: '#FFFFFF', color: '#FFFFFF'}}>Reply</Button>
            </Box>
        </Box>
    )
}
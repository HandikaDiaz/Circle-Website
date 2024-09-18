import { Box, Button, FormControl, FormLabel, Input, Image, Textarea } from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";


export function DetailReply() {
    return (
        <Box
            mt={'20px'}
            px={'25px'}
            pb={'20px'}
            display={'flex'}
            color={'home.text'}
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

                <Textarea
                    ms={'13px'}
                    border={'none'}
                    resize={'none'}
                    rows={1}
                    fontSize={'14px'}
                    color={'home.text'}
                    fontWeight={'bold'}
                    placeholder="Type your reply!"
                />
            </Box>

            <Box>
                <FormControl display={'flex'} alignItems={'center'}>
                    <FormLabel
                        display={'flex'}
                        mt={'5px'}
                        color={'home.button.hoverText'}
                        fontSize={'25px'}><LuImagePlus /></FormLabel>
                    <Input type='file' hidden />
                    <Button
                        padding={'5px 30px'}
                        border={'none'}
                        height={'30px'}
                        fontSize={'14px'}
                        color={'home.button.text'}
                        cursor={'pointer'}
                        transition={'0.3s'}
                        fontWeight={'bold'}
                        borderRadius={'15px'}
                        backgroundColor={'home.button.background'}
                        _hover={{ backgroundColor: 'home.button.hoverBackground', color: 'home.button.hoverText' }}>Reply</Button>
                </FormControl>

            </Box>
        </Box>
    )
}
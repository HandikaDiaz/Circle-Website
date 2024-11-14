import { Box, Button, FormControl, FormLabel, Image, Input } from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";
import { ErrorMessage } from "../../../auth/schemas/error";
import { useReplyForm } from "../../hooks/use-reply";
import { useUser } from "../../hooks/use-user";


export function StatusReply() {
    const { register, handleSubmit, errors, onSubmit } = useReplyForm();
    const { data } = useUser();

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
                        src={data?.image} />

                    <Input
                        type='text'
                        ms={'13px'}
                        border={'none'}
                        width={'300px'}
                        height={'25px'}
                        fontSize={'14px'}
                        color={'home.text'}
                        fontWeight={'bold'}
                        {...register('content')}
                        placeholder="Type your reply!"
                        _focusVisible={{
                            borderColor: "transparent",
                        }}
                        _hover={{
                            borderColor: "transparent",
                        }} />
                </Box>

                <Box display={'flex'}>
                <FormControl>
                        <FormLabel
                            cursor={'pointer'}
                            display={'flex'}
                            color={'home.button.hoverText'}
                            fontSize={'25px'}><LuImagePlus /></FormLabel>
                        <Input type='file' {...register('image')} hidden name="image"/>
                        <ErrorMessage message={errors.image?.message || ''} />
                    </FormControl>

                    <Button
                        type='submit'
                        border={'none'}
                        height={'30px'}
                        fontSize={'14px'}
                        cursor={'pointer'}
                        transition={'0.3s'}
                        fontWeight={'bold'}
                        padding={'5px 30px'}
                        borderRadius={'15px'}
                        color={'home.button.text'}
                        backgroundColor={'home.button.background'}
                        _hover={{ backgroundColor: 'home.button.hoverBackground', color: 'home.button.hoverText' }}>Reply</Button>
                </Box>
            </Box>
        </form>
    )
}
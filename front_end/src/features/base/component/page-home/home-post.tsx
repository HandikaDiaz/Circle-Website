import { Box, Button, FormControl, FormLabel, Input, Image, Spinner } from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";
import { usePost } from "../../hooks/use-post";
import { ErrorMessage } from "../../../auth/schemas/error";
import { useUser } from "../../hooks/use-user";

export function HomePost() {
    const { register, handleSubmit, errors, onSubmit, isSubmitting, isLoading } = usePost();
    const { data } = useUser();

    if (isLoading) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" height="50vh">
                <Spinner size="xl" color="home.text" />
            </Box>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
                        placeholder="What is happening?!"
                        _focusVisible={{
                            borderColor: "transparent",
                        }}
                        _hover={{
                            borderColor: "transparent",
                        }} />
                    <ErrorMessage message={errors.content?.message} />
                </Box>

                <Box display={'flex'}>
                    <FormControl>
                        <FormLabel
                            cursor={'pointer'}
                            display={'flex'}
                            color={'home.button.hoverText'}
                            fontSize={'25px'}><LuImagePlus /></FormLabel>
                        <Input type='file' {...register('image')} hidden name="image" />
                        <ErrorMessage message={errors.image?.message || ''} />
                    </FormControl>

                    <Button
                        type='submit'
                        border={'none'}
                        height={'30px'}
                        fontSize={'14px'}
                        cursor={'pointer'}
                        fontWeight={'bold'}
                        transition={'0.3s'}
                        padding={'5px 30px'}
                        borderRadius={'15px'}
                        disabled={isSubmitting}
                        color={'home.button.text'}
                        backgroundColor={'home.button.background'}
                        _hover={{ backgroundColor: 'home.button.hoverBackground', color: 'home.button.hoverText' }}>
                        {isSubmitting ? <Spinner size="sm" /> : 'Post'}
                    </Button>
                </Box>
            </Box>
        </form>
    )
}
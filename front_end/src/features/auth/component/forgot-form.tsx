import {
    FormControl,
    Input,
    Button,
    Box
} from '@chakra-ui/react'
import { useForgotForm } from '../hooks/use-forgot-form';
import { ErrorMessage } from '../schemas/error';

export function ForgotForm() {
    const { register, handleSubmit, errors, onSubmit } = useForgotForm();
    return (
        <Box
            mx="auto"
            mt={'20px'}
            display={"flex"}
            alignItems="center"
            textColor={'#FFFFFF'}
            justifyContent="center">

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl
                    width={'300px'}
                    display={'flex'}
                    flexDirection={'column'}
                    isInvalid={!!errors.userName}>

                    <Input
                        mb={'10px'}
                        type='text'
                        width={'100%'}
                        height={'28px'}
                        display={'block'}
                        borderRadius={'5px'}
                        {...register('userName')}
                        border={'1px solid #545454'}
                        placeholder='  Email'
                        backgroundColor={'transparent'} />
                    <ErrorMessage message={errors.userName?.message} />

                    <Button
                        width={'100%'}
                        type='submit'
                        border={'none'}
                        height={'30px'}
                        mt={'8px'}
                        fontSize={'15px'}
                        color={'#FFFFFF'}
                        cursor={'pointer'}
                        fontWeight={'bold'}
                        borderRadius={'15px'}
                        backgroundColor={'#04A51E'}
                        _hover={{ backgroundColor: '#FFFFFF', color: '#FFFFFF' }}>Send Instruction</Button>
                </FormControl>
            </form>
        </Box>
    );
}

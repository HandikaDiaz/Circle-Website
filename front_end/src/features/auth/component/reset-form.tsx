import {
    FormControl,
    Input,
    Button,
    Box
} from '@chakra-ui/react'
import { userResetForm } from '../hooks/use-reset-form';
import { ErrorMessage } from '../schemas/error';

export function ResetForm() {
    const { register, handleSubmit, errors, onSubmit } = userResetForm();

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
                    flexDirection={'column'}>

                    <Input
                        mb={'10px'}
                        type='password'
                        width={'100%'}
                        height={'28px'}
                        display={'block'}
                        borderRadius={'5px'}
                        {...register('password')}
                        border={'1px solid #545454'}
                        placeholder='  New Password'
                        backgroundColor={'transparent'} />
                    <ErrorMessage message={errors.password?.message} />

                    <Input
                        mb={'10px'}
                        type='password'
                        width={'100%'}
                        height={'28px'}
                        display={'block'}
                        borderRadius={'5px'}
                        {...register('confirmPassword')}
                        border={'1px solid #545454'}
                        placeholder='  Confirm New Password'
                        backgroundColor={'transparent'} />
                    <ErrorMessage message={errors.confirmPassword?.message} />

                    <Button
                        mt={'8px'}
                        type='submit'
                        width={'100%'}
                        border={'none'}
                        height={'30px'}
                        fontSize={'15px'}
                        color={'#FFFFFF'}
                        cursor={'pointer'}
                        fontWeight={'bold'}
                        borderRadius={'15px'}
                        backgroundColor={'#04A51E'}
                        _hover={{ backgroundColor: '#FFFFFF', color: '#FFFFFF' }}>Create New Password</Button>
                </FormControl>
            </form>
        </Box>
    );
}

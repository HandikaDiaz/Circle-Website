import {
    Box,
    Button,
    FormControl,
    Input,
    Text
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useLoginForm } from '../hooks/use.login.form';
import { ErrorMessage } from '../schemas/error';

export function LoginForm() {
    const { register, handleSubmit, errors, onSubmit } = useLoginForm();

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
                        type='email'
                        width={'100%'}
                        height={'28px'}
                        display={'block'}
                        borderRadius={'5px'}
                        {...register('email')}
                        border={'1px solid #545454'}
                        placeholder='  Email/Username'
                        backgroundColor={'transparent'} />
                        <ErrorMessage message={errors.email?.message}/>

                    <Input
                        my={'10px'}
                        width={'100%'}
                        height={'28px'}
                        type='password'
                        display={'block'}
                        borderRadius={'5px'}
                        placeholder='  Password'
                        {...register('password')}
                        border={'1px solid #545454'}
                        backgroundColor={'transparent'} />
                        <ErrorMessage message={errors.password?.message}/>

                    <Link to={'/forgot'} style={{ textDecoration: 'none' }}>
                        <Text
                            href=""
                            as={'a'}
                            my={'5px'}
                            color={'white'}
                            fontSize="small"
                            alignItems="end"
                            display={"flex"}
                            justifyContent={'end'}
                            textDecoration={'none'}>Forgot password?</Text>
                    </Link>

                    <Button
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
                        _hover={{ backgroundColor: '#FFFFFF', color: '#FFFFFF' }}>Login</Button>
                </FormControl>
            </form>
        </Box>
    );
}

import {
    Box,
    Button,
    FormControl,
    Input,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormInput, registerSchema } from '../schemas/register';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../schemas/error';

export function RegisterForm() {
    const { 
        register, 
        handleSubmit, 
        formState : { errors }, } = useForm<RegisterFormInput>({
            resolver : zodResolver(registerSchema)
    });

    function onSubmit(data : RegisterFormInput) {
        console.log(data);
    };

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
                gap={'10px'} 
                width={'300px'}
                display={'flex'} 
                flexDirection={'column'}>

                <Input 
                    type='text' 
                    width={'100%'}
                    height={'30px'}
                    display={'block'}
                    borderRadius={'5px'}
                    placeholder='  Full Name'
                    {...register('fullName')}
                    border={'1px solid #545454'}
                    backgroundColor={'transparent'}/>
                    <ErrorMessage message={errors.fullName?.message} />

                <Input 
                    type='email' 
                    width={'100%'}
                    height={'30px'}
                    display={'block'}
                    borderRadius={'5px'}
                    placeholder='  Email'
                    {...register('email')}
                    border={'0.1px solid #545454'}
                    backgroundColor={'transparent'}/>
                    <ErrorMessage message={errors.email?.message}/>

                <Input 
                    width={'100%'}
                    height={'30px'}
                    type='password' 
                    display={'block'}
                    borderRadius={'5px'}
                    placeholder='  Password'
                    {...register('password')}
                    border={'1px solid #545454'}
                    backgroundColor={'transparent'}/>
                    <ErrorMessage message={errors.password?.message}/>

                <Button
                    type='submit'
                    width={'100%'}
                    border={'none'}
                    height={'30px'}
                    color={'#FFFFFF'}
                    fontSize={'15px'}
                    cursor={'pointer'}
                    fontWeight={'bold'}
                    borderRadius={'15px'}
                    backgroundColor={'#04A51E'}
                    _hover={{ backgroundColor: '#FFF', color: '#04A51E' }}>Create</Button>
            </FormControl>
            </form>
        </Box>
    );
}

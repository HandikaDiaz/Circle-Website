import {
    FormControl,
    Input,
    Button,
    Box,
} from '@chakra-ui/react'
import { useRegisterForm } from "../hooks/use-register-form";

export function RegisterForm() {
    const { handleChange, handleSubmit } = useRegisterForm();

    return (
        <Box
            mx="auto"
            mt={'20px'}
            display={"flex"}
            alignItems="center"
            textColor={'#FFFFFF'}
            justifyContent="center">

            <FormControl 
                gap={'10px'} 
                width={'300px'}
                display={'flex'} 
                flexDirection={'column'}>

                <Input 
                    type='text' 
                    width={'100%'}
                    height={'30px'}
                    name='fullName' 
                    display={'block'}
                    borderRadius={'5px'}
                    onChange={handleChange} 
                    placeholder='  Full Name'
                    border={'1px solid #545454'}
                    backgroundColor={'transparent'}/>

                <Input 
                    type='email' 
                    name='email' 
                    width={'100%'}
                    height={'30px'}
                    display={'block'}
                    borderRadius={'5px'}
                    placeholder='  Email'
                    onChange={handleChange} 
                    border={'0.1px solid #545454'}
                    backgroundColor={'transparent'}/>

                <Input 
                    width={'100%'}
                    height={'30px'}
                    type='password' 
                    name='password' 
                    display={'block'}
                    borderRadius={'5px'}
                    onChange={handleChange} 
                    placeholder='  Password'
                    border={'1px solid #545454'}
                    backgroundColor={'transparent'}/>

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
                    onClick={handleSubmit}
                    backgroundColor={'#04A51E'}
                    _hover={{ backgroundColor: '#FFF', color: '#04A51E' }}>Create</Button>
            </FormControl>
        </Box>
    );
}

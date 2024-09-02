import {
    FormControl,
    Input,
    Button,
    Box,
    Text
} from '@chakra-ui/react'
import { useRegisterForm } from "../hooks/use-register-form";

export function LoginForm() {
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
                width={'300px'}
                display={'flex'} 
                flexDirection={'column'}>

                <Input 
                    mb={'10px'}
                    type='email' 
                    name='email' 
                    width={'100%'}
                    height={'28px'}
                    display={'block'}
                    borderRadius={'5px'}
                    onChange={handleChange} 
                    border={'1px solid #545454'}
                    placeholder='  Email/Username'
                    backgroundColor={'transparent'}/>

                <Input 
                    width={'100%'}
                    height={'28px'}
                    type='password' 
                    name='password' 
                    display={'block'}
                    borderRadius={'5px'}
                    onChange={handleChange} 
                    placeholder='  Password'
                    border={'1px solid #545454'}
                    backgroundColor={'transparent'}/>

                <Text 
                    href="" 
                    as={'a'} 
                    my={'10px'}
                    color={'white'}
                    fontSize="small" 
                    alignItems="end"
                    display={"flex"}
                    justifyContent={'end'}
                    textDecoration={'none'}>Forgot password?</Text>

                <Button
                    width={'100%'}
                    border={'none'}
                    height={'30px'}
                    fontSize={'15px'}
                    color={'#FFFFFF'}
                    cursor={'pointer'}
                    fontWeight={'bold'}
                    borderRadius={'15px'}
                    onClick={handleSubmit}
                    backgroundColor={'#04A51E'}
                    _hover={{backgroundColor: '#FFFFFF', color: '#FFFFFF'}}>Login</Button>
            </FormControl>
        </Box>
    );
}

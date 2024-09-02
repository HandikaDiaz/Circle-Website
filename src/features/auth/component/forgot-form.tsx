import {
    FormControl,
    Input,
    Button,
    Box
} from '@chakra-ui/react'
import { useForgotForm } from '../hooks/use-forgot-form';

export function ForgotForm() {
    const { handleChange, handleSubmit } = useForgotForm();

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

                <Button
                    width={'100%'}
                    border={'none'}
                    height={'30px'}
                    mt={'8px'}
                    fontSize={'15px'}
                    color={'#FFFFFF'}
                    cursor={'pointer'}
                    fontWeight={'bold'}
                    borderRadius={'15px'}
                    onClick={handleSubmit}
                    backgroundColor={'#04A51E'}
                    _hover={{backgroundColor: '#FFFFFF', color: '#FFFFFF'}}>Send Instruction</Button>
            </FormControl>
        </Box>
    );
}

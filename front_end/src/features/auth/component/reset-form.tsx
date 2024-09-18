import {
    FormControl,
    Input,
    Button,
    Box
} from '@chakra-ui/react'
import { userResetForm } from '../hooks/use-reset-form';

export function ResetForm() {
    const { handleChange, handleSubmit } = userResetForm();

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
                    type='password' 
                    name='password' 
                    width={'100%'}
                    height={'28px'}
                    display={'block'}
                    borderRadius={'5px'}
                    onChange={handleChange} 
                    border={'1px solid #545454'}
                    placeholder='  New Password'
                    backgroundColor={'transparent'}/>

                <Input 
                    mb={'10px'}
                    type='password' 
                    name='confirmPassword' 
                    width={'100%'}
                    height={'28px'}
                    display={'block'}
                    borderRadius={'5px'}
                    onChange={handleChange} 
                    border={'1px solid #545454'}
                    placeholder='  Confirm New Password'
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
                    _hover={{backgroundColor: '#FFFFFF', color: '#FFFFFF'}}>Create New Password</Button>
            </FormControl>
        </Box>
    );
}

import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiV1 } from '../../../libs/api';
import { removeUser } from '../../../store/auth.slice';
import { useToast } from '@chakra-ui/react';

export function useLogout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    const logout = async () => {
        const logoutPromise = apiV1.post('/logout').then(() => {
            Cookies.remove('token');
            dispatch(removeUser());
            navigate('/login', { replace: true });
        });

        try {
            await logoutPromise;
            toast({
                title: 'Logout successful!',
                description: 'You have been logged out.',
                status: 'success',
                position: 'top',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Logout failed',
                description: 'An error occurred during logout.',
                status: 'error',
                position: 'top',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return logout;
}

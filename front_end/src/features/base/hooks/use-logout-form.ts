import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiV1 } from '../../../libs/api';
import { removeUser } from '../../../store/auth.slice';

export function useLogout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await apiV1.post('/logout');
            Cookies.remove('token');
            dispatch(removeUser());
            
            navigate('/login', { replace: true });
            alert("Logout successful!");
        } catch (error) {
            console.error("Error during logout:", error);
            alert("Logout failed.");
        }
    };

    return logout;
}

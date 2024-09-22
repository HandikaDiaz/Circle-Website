import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Cookies from "js-cookie";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../store/auth.slice';
import { useAppDispatch } from '../../../store/hooks/use.store';
import { LoginFormInput, loginSchema } from '../schemas/login.schema';
import { LoginRequestDTO, LoginResponseDTO } from '../types/login.dto';
import { apiV1 } from '../../../libs/api';

export function useLoginForm() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }, } = useForm<LoginFormInput>({
            resolver: zodResolver(loginSchema)
        });

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    async function onSubmit(data: LoginFormInput) {
        try {
            const response = await apiV1.post<
                null,
                { data: LoginResponseDTO },
                LoginRequestDTO
            >('/auth/login', data);
            const { user, token } = response.data;

            dispatch(setUser(user));
            Cookies.set('token', token, { expires: 1 });
            navigate('/', {replace: true});
            
            console.log(data);
            console.log(response.data);
        } catch (error) {
            console.log("Error:", error);

            if (axios.isAxiosError(error) && error.response) {
                const stackMessage = error.response.data.message;
                if (stackMessage.includes('Email')) {
                    setError('email', {
                        message: error.response.data.message,
                    });
                }

                if (stackMessage.includes('Password')) {
                    setError('password', {
                        message: error.response.data.message,
                    });
                }
            } else {
                console.log("Other Error:", error);
            }
        }
    };
    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
    };
}

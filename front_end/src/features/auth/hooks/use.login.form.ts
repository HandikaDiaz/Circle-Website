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
import { useToast } from '@chakra-ui/react';

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
    const toast = useToast();

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

            toast({
                title: "Login successful!",
                description: `Welcome back, ${user.fullName}!`,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });

            if (user.role === 'ADMIN') {
                navigate('/admin', { replace: true });
            } else {
                navigate('/', { replace: true });
            }
        } catch (error) {
            console.log("Error:", error);
            let errorMessage = "Something wrong!!";

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
            toast({
                title: "Login failed!",
                description: errorMessage,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
    };
    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
    };
}

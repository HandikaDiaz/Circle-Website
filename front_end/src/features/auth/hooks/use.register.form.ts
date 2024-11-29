import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormInput, registerSchema } from '../schemas/register.schema';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from "js-cookie";
import { RegisterResponseDTO } from '../types/register.dto';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks/use.store';
import { setUser } from '../../../store/auth.slice';
import { apiV1 } from '../../../libs/api';
import { useToast } from '@chakra-ui/react';

export function useRegisterForm() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }, } = useForm<RegisterFormInput>({
            resolver: zodResolver(registerSchema)
        });

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const toast = useToast();

    async function onSubmit(data: RegisterFormInput) {
        try {
            toast({
                title: "Registering...",
                status: "loading",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
            const response = await apiV1.post<RegisterResponseDTO>('/auth/register', data);
            const { user, token } = response.data;

            dispatch(setUser(user));
            Cookies.set('token', token, { expires: 1 });

            toast({
                title: "Registration successful!",
                description: `Welcome, ${user.fullName}!`,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });

            navigate('/');
        } catch (error) {
            console.log("Error:", error);
            let errorMessage = "Something wrong!!";

            if (axios.isAxiosError(error) && error.response) {
                const stackMessage = error.response?.data?.stack ?? "";
                if (stackMessage.includes('"fullName"')) {
                    setError('fullName', {
                        message: "Full name must be at least 5 characters long",
                    });
                }

                if (stackMessage.includes('"email"')) {
                    setError('email', {
                        message: "Invalid email format",
                    });
                }

                if (stackMessage.includes('"password"')) {
                    setError('password', {
                        message: "Password must be at least 6 characters long",
                    });
                }
            } else {
                console.log("Other Error:", error);
            }
            toast({
                title: "Registration failed!",
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

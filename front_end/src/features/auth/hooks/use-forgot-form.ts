import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { apiV1 } from "../../../libs/api";
import { ForgotFormInput, forgotSchema } from "../schemas/forgot.schema";
import { ForgotEmailForm, ResponseForgotEmailForm } from "../types/dto";

export function useForgotForm() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }, } = useForm<ForgotFormInput>({
            resolver: zodResolver(forgotSchema)
        });
    const toast = useToast();

    async function onSubmit(data: ForgotFormInput) {
        try {
            await apiV1.post<
                null,
                { data: ResponseForgotEmailForm },
                ForgotEmailForm
            >('/auth/forgot-password', data);

            toast({
                title: "Login successful!",
                description: "Check your email for reset instructions.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        } catch (error) {
            console.log("Error:", error);
            let errorMessage = "Something wrong!!";

            if (axios.isAxiosError(error) && error.response) {
                const stackMessage = error.response.data.message;
                if (stackMessage.includes('userName')) {
                    setError('userName', {
                        message: error.response.data.message,
                    });
                }
            } else {
                console.log("Other Error:", error);
            }
            toast({
                title: "Forgot password failed!",
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
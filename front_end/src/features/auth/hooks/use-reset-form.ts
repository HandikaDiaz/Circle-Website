import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { apiV1 } from "../../../libs/api";
import { ResetFormInput, resetSchema } from "../schemas/reset.schema";

export function userResetForm() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ResetFormInput>({
        resolver: zodResolver(resetSchema)
    });

    const navigate = useNavigate();
    const toast = useToast();
    const { token } = useParams<{ token: string }>();

    async function onSubmit(data: ResetFormInput) {
        if (!token) {
            toast({
                title: "Token missing!",
                description: "The reset token is required.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        try {
            await apiV1.post<null, { data: { token: string; password: string } }, { token: string; password: string }>(
                `/auth/reset-password/${token}`,
                { ...data, token }
            );

            toast({
                title: "Password reset successful!",
                description: "You can now log in with your new password.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });

            navigate("/login");
        } catch (error) {
            console.log("Error:", error);
            let errorMessage = "Something went wrong!";

            if (axios.isAxiosError(error) && error.response) {
                const stackMessage = error.response.data.message;
                if (stackMessage.includes('password')) {
                    setError('password', {
                        message: error.response.data.message,
                    });
                }
            } else {
                console.log("Other Error:", error);
            }

            toast({
                title: "Reset password failed!",
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
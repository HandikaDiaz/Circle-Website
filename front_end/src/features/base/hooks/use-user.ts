import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from 'react-hook-form';
import { UserEntity } from '../../../entities/user-entity';
import { apiV1 } from '../../../libs/api';
import { UpdateUserFormInput, updateUserSchema } from '../schemas/user.schema';
import { UpdateUserDTO } from '../types/user.dto';
import Cookies from 'js-cookie';

export function useUser() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }, } = useForm<UpdateUserFormInput>({
            resolver: zodResolver(updateUserSchema)
        });
    const queryClient = useQueryClient();

    async function getUser() {
        const response = await apiV1.get<null, { data: UserEntity }>(
            '/getUser', {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            }
        );
        return response.data;
    }

    const { data, isLoading } = useQuery<UserEntity, Error, UserEntity>({
        queryKey: ['user'],
        queryFn: getUser,
    })
    
    async function updateUser(data: UpdateUserDTO) {
        const response = await apiV1.put<null, { data: UserEntity }>(
            '/user', data
        );
        
        queryClient.invalidateQueries({ queryKey: ['user'] });
        return response.data;
    }

    const { mutateAsync: createPostAsync } = useMutation<
        UpdateUserDTO,
        Error,
        UpdateUserDTO>({
            mutationKey: ['updateUser'],
            mutationFn: updateUser,
        })

    async function onSubmit(data: UpdateUserFormInput) {
        try {
            await createPostAsync(data);
            alert("Edit profile successfully!");
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to edit profile!");
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
        data,
        isLoading
    };
}

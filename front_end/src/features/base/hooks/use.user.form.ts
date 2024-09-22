import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from 'react-hook-form';
import { UserEntity } from '../../../entities/user-entity';
import { apiV1 } from '../../../libs/api';
import { UpdateUserFormInput, updateUserSchema } from '../schemas/user.schema';
import { UpdateUserDTO } from '../types/user.dto';

export function useUpdateUserForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }, } = useForm<UpdateUserFormInput>({
            resolver: zodResolver(updateUserSchema)
        });
    const queryClient = useQueryClient();

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
    };
}

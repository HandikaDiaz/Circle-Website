import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { UserEntity } from '../../../entities/user-entity';
import { apiV1 } from '../../../libs/api';
import { UpdateUserFormInput, updateUserSchema } from '../schemas/user.schema';
import { UpdateUserDTO } from '../types/user.dto';
import { useToast } from '@chakra-ui/react';

export function useUser() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }, } = useForm<UpdateUserFormInput>({
            resolver: zodResolver(updateUserSchema)
        });
    const queryClient = useQueryClient();
    const toast = useToast();

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
        const formData = new FormData();
        formData.append('userName', data.userName ?? '');
        formData.append('fullName', data.fullName ?? '');
        if (data.image && data.image.length > 0) {
            formData.append('image', data.image[0]);
        }
        if (data.background && data.background.length > 0) {
            formData.append('background', data.background[0]);
        }
        const response = await apiV1.put<null, { data: UserEntity }>(
            `/user`, formData, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
                'Content-Type': 'multipart/form-data',
            }
        }
        );

        queryClient.invalidateQueries({ queryKey: ['user'] });
        return response.data;
    }

    const { mutateAsync: createPostAsync } = useMutation<
        UserEntity,
        Error,
        UpdateUserDTO>({
            mutationKey: ['updateUser'],
            mutationFn: updateUser,
        })

    async function onSubmit(data: UpdateUserFormInput) {
        const updateUser: UpdateUserDTO = {
            userName: data.userName,
            fullName: data.fullName,
            image: data.image,
            background: data.background
        };
        const priflePromise = createPostAsync(updateUser);
        toast.promise(priflePromise, {
            loading: {
                title: 'Creating Post',
                description: 'Please wait...',
                duration: 5000,
                isClosable: true,
            },
            success: {
                title: 'Post Created',
                description: 'Your post has been created successfully!',
                duration: 5000,
                isClosable: true,
            },
            error: {
                title: 'Post Creation Failed',
                description: 'There was an error creating your post.',
                duration: 5000,
                isClosable: true,
            },
        });

        try {
            await priflePromise
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

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { GetPostEntity } from '../../../entities/post-entity';
import { apiV1 } from '../../../libs/api';
import { useAppSelector } from '../../../store/hooks/use.store';
import { CreatePostFormInput, postSchema } from '../schemas/post.schema';
import { CreatePostDTO } from '../types/post.dto';
import { useToast } from '@chakra-ui/react';

export function usePost() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }, } = useForm<CreatePostFormInput>({
            resolver: zodResolver(postSchema)
        });
    const queryClient = useQueryClient();
    const { id: authorId } = useAppSelector((state) => state.auth);
    
    const toast = useToast();

    async function getPosts() {
        const response = await apiV1.get<null, { data: GetPostEntity[] }>(
            `/post/${authorId}`
        );
        return response.data;
    }

    const { data, isLoading } = useQuery<GetPostEntity[], Error, GetPostEntity[]>({
        queryKey: ['post', authorId],
        queryFn: getPosts,
    });

    async function createPost(data: CreatePostDTO) {
        const formData = new FormData();
        formData.append('content', data.content ?? '');
        formData.append('authorId', authorId.toString());
        if (data.image && data.image.length > 0) {
            formData.append('image', data.image[0]);
        }
        const response = await apiV1.post(
            `/post`, formData, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
                'Content-Type': 'multipart/form-data',
            }
        });

        queryClient.invalidateQueries({ queryKey: ['posts', authorId] });
        return response.data;
    }

    const { mutateAsync: createPostAsync } = useMutation<
        CreatePostDTO,
        Error,
        CreatePostDTO>({
            mutationKey: ['createPost'],
            mutationFn: createPost,
        })

    async function onSubmit(data: CreatePostFormInput) {
        const postData: CreatePostDTO = {
            content: data.content,
            image: data.image,
            authorId,
        };
        
        const postPromise = createPostAsync(postData);
        toast.promise(postPromise, {
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
            await postPromise;
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            reset();
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return {
        register,
        handleSubmit,
        reset,
        errors,
        isSubmitting,
        onSubmit,
        data,
        isLoading
    };
}
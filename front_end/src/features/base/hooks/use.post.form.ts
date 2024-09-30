import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from 'react-hook-form';
import { PostEntity } from '../../../entities/post-entity';
import { apiV1 } from '../../../libs/api';
import { CreatePostFormInput, postSchema } from '../schemas/post.schema';
import { CreatePostDTO } from '../types/post.dto';

export function usePostForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }, } = useForm<CreatePostFormInput>({
            resolver: zodResolver(postSchema)
        });

    async function getPosts() {
        const response = await apiV1.get<null, { data:  PostEntity[] }>(
            '/post'
        );
        
        return response.data;
    }

    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery<PostEntity[], Error, PostEntity[]>({
        queryKey: ['post'],
        queryFn: getPosts,
    });

    async function createPost(data: CreatePostDTO) {
        const response = await apiV1.post<null, { data: PostEntity }>(
            '/post', data
        );
        console.log("ini data : ", data);
        
        queryClient.invalidateQueries({ queryKey: ['post'] });
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
        try {
            await createPostAsync(data);
            alert("Post created successfully!");
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post.");
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
        data,
        isLoading,
    };
}
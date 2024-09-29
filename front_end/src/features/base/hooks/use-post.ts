import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { GetPostEntity } from '../../../entities/post-entity';
import { apiV1 } from '../../../libs/api';
import { useAppSelector } from '../../../store/hooks/use.store';
import { CreatePostFormInput, postSchema } from '../schemas/post.schema';
import { CreatePostDTO } from '../types/post.dto';

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
        if (data.image) {
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
        try {
            await createPostAsync(postData);
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            reset();
            alert("Post created successfully!");
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post.");
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
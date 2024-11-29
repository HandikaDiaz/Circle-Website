import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { apiV1 } from '../../../libs/api';
import { CreateReplyFormInput, replySchema } from '../schemas/reply.schema';
import { CreateReplyDTO } from '../types/reply.dto';
import { useToast } from '@chakra-ui/react';

export function useReplyForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }, } = useForm<CreateReplyFormInput>({
            resolver: zodResolver(replySchema)
        });
    const { postId } = useParams<{ postId: string }>();
    const queryClient = useQueryClient();
    const toast = useToast();

    async function createReply(data: CreateReplyDTO) {
        const formData = new FormData();
        formData.append('content', data.content ?? '');
        if (data.image && data.image.length > 0) {
            formData.append('image', data.image[0]);
        }
        const response = await apiV1.post(
            `/post/${postId}/reply`, formData, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
                'Content-Type': 'multipart/form-data',
            }
        });

        queryClient.invalidateQueries({ queryKey: ['reply-post', postId] });
        return response.data;
    }

    const { mutateAsync: createReplyAsync } = useMutation<
        CreateReplyDTO,
        Error,
        CreateReplyDTO>({
            mutationKey: ['createReply'],
            mutationFn: createReply,
        })

    async function onSubmit(data: CreateReplyFormInput) {
        const replyData: CreateReplyDTO = {
            content: data.content,
            image: data.image,
            postId: Number(postId),
        };

        const replyPromise = createReplyAsync(replyData);
        toast.promise(replyPromise, {
            loading: {
                title: 'Creating Reply',
                description: 'Please wait...',
                duration: 5000,
                isClosable: true,
            },
            success: {
                title: 'Reply Created',
                description: 'Your reply has been created successfully!',
                duration: 5000,
                isClosable: true,
            },
            error: {
                title: 'Reply Creation Failed',
                description: 'There was an error creating your reply.',
                duration: 5000,
                isClosable: true,
            },
        });

        try {
            await replyPromise;
            queryClient.invalidateQueries({ queryKey: ['reply-post'] });
            reset();
        } catch (error) {
            console.error("Error creating post:", error);   
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit
    };
}

export function useDetailReplyForm(postId: number | null) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }, } = useForm<CreateReplyFormInput>({
            resolver: zodResolver(replySchema)
        });
    const queryClient = useQueryClient();
    const toast = useToast();

    async function createReply(data: CreateReplyDTO) {
        const formData = new FormData();
        formData.append('content', data.content ?? '');
        if (data.image && data.image.length > 0) {
            formData.append('image', data.image[0]);
        }
        const response = await apiV1.post(
            `/post/${postId}/reply`, formData, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
                'Content-Type': 'multipart/form-data',
            }
        });

        queryClient.invalidateQueries({ queryKey: ['reply-post', postId] });
        return response.data;
    }

    const { mutateAsync: createReplyAsync } = useMutation<
        CreateReplyDTO,
        Error,
        CreateReplyDTO>({
            mutationKey: ['createReply'],
            mutationFn: createReply,
        })

    async function onSubmit(data: CreateReplyFormInput) {
        const replyData: CreateReplyDTO = {
            content: data.content,
            image: data.image,
            postId: Number(postId),
        };

        const replyPromise = createReplyAsync(replyData);
        toast.promise(replyPromise, {
            loading: {
                title: 'Creating Reply',
                description: 'Please wait...',
                duration: 5000,
                isClosable: true,
            },
            success: {
                title: 'Reply Created',
                description: 'Your reply has been created successfully!',
                duration: 5000,
                isClosable: true,
            },
            error: {
                title: 'Reply Creation Failed',
                description: 'There was an error creating your reply.',
                duration: 5000,
                isClosable: true,
            },
        });

        try {
            await replyPromise;
            queryClient.invalidateQueries({ queryKey: ['reply-post'] });
            reset();
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit
    };
}

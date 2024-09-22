import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from 'react-hook-form';
import { ReplyEntity } from '../../../entities/repyl-entity';
import { apiV1 } from '../../../libs/api';
import { CreateReplyFormInput, replySchema } from '../schemas/reply.schema';
import { CreateReplyDTO } from '../types/reply.dto';

export function useReplyForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }, } = useForm<CreateReplyFormInput>({
            resolver: zodResolver(replySchema)
        });

    async function getReply() {
        const response = await apiV1.get<null, { data:  ReplyEntity[] }>(
            '/reply-post'
        );
        
        return response.data;
    }

    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery<ReplyEntity[], Error, ReplyEntity[]>({
        queryKey: ['reply-post'],
        queryFn: getReply,
    });

    async function createReply(data: CreateReplyDTO) {
        const response = await apiV1.post<null, { data: ReplyEntity }>(
            '/reply-post', data
        );
        
        queryClient.invalidateQueries({ queryKey: ['reply-post'] });
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
        try {
            await createReplyAsync(data);
            alert("Successfully created a post reply!");
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to reply to post!");
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

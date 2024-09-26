import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from 'react-hook-form';
import { ReplyEntity } from '../../../entities/repyl-entity';
import { apiV1 } from '../../../libs/api';
import { CreateReplyFormInput, replySchema } from '../schemas/reply.schema';
import { CreateReplyDTO } from '../types/reply.dto';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

export function useReplyForm() {
    const { postId } = useParams<{ postId: string }>();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }, } = useForm<CreateReplyFormInput>({
            resolver: zodResolver(replySchema)
        });

    async function getReply() {
        const response = await apiV1.get<null, { data: ReplyEntity[] }>(
            `/post/${postId}/reply`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        }
        );
        return response.data;
    }

    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery<ReplyEntity[], Error, ReplyEntity[]>({
        queryKey: ['post', postId],
        queryFn: getReply,
        enabled: !!postId,
    });

    async function createReply(data: CreateReplyDTO) {
        const replyData = { ...data, postId };
        console.log("Reply data to send:", replyData);

        const response = await apiV1.post<null, { data: ReplyEntity }>(
            `/post/${postId}/reply`, replyData, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        }
        );

        queryClient.invalidateQueries({ queryKey: ['reply-post', postId] });
        return response.data;
    }

    const { mutateAsync: createReplyAsync } = useMutation<
        ReplyEntity,
        Error,
        CreateReplyDTO>({
            mutationKey: ['createReply', postId],
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

import { useQuery } from "@tanstack/react-query";
import Cookies from 'js-cookie';
import { useParams } from "react-router-dom";
import { GetPostEntity } from '../../../entities/post-entity';
import { ReplyEntity } from "../../../entities/repyl-entity";
import { UserEntity } from "../../../entities/user-entity";
import { apiV1 } from '../../../libs/api';

export function useAllPosts() {
    async function getAllPosts() {
        const response = await apiV1.get<null, { data: GetPostEntity[] }>(
            `/getAllPost`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    const { data, isLoading, refetch } = useQuery<GetPostEntity[], Error, GetPostEntity[]>({
        queryKey: ['posts'],
        queryFn: getAllPosts,
    });

    return {
        data,
        isLoading,
        getAllPosts,
        refetch
    }
}

export function useAllReplies() {
    const { postId } = useParams<{ postId: string }>();
    async function getAllReplies() {
        const response = await apiV1.get<null, { data: ReplyEntity[] }>(
            `/post/${postId}/reply`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    const { data, isLoading } = useQuery<ReplyEntity[], Error>({
        queryKey: ['reply-post', postId],
        queryFn: getAllReplies,
        enabled: !!postId,
    });

    return {
        data,
        isLoading
    }
}

export function useMediaReplies(postId: number | null) {
    async function getAllReplies() {
        if (!postId) return [];
        const response = await apiV1.get<null, { data: ReplyEntity[] }>(
            `/post/${postId}/reply`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    const { data, isLoading } = useQuery<ReplyEntity[], Error>({
        queryKey: ['reply-post', postId],
        queryFn: getAllReplies,
        enabled: !!postId,
    });

    return {
        data,
        isLoading
    }
}

export function useAllUsers() {
    async function getAllUsers() {
        const response = await apiV1.get<null, { data: UserEntity[] }>(
            `/getAllUser`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        }
        );
        return response.data
    }

    const { data, isLoading } = useQuery<UserEntity[], Error, UserEntity[]>({
        queryKey: ['users'],
        queryFn: getAllUsers,
    });

    return {
        data,
        isLoading
    }
}

export function useAllUsersById() {
    const { userId } = useParams<{ userId: string }>();

    async function getAllUsers() {
        const response = await apiV1.get<null, { data: UserEntity }>(
            `/getUserById/${userId}`
        );
        return response.data
    }

    const { data, isLoading } = useQuery<UserEntity, Error, UserEntity>({
        queryKey: ['users', userId],
        queryFn: getAllUsers,
        enabled: !!userId,
    });

    return {
        data,
        isLoading
    }
}
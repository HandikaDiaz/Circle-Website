import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Cookies from 'js-cookie';
import { useParams } from "react-router-dom";
import { ReplyEntity } from "../../../entities/repyl-entity";
import { UserEntity } from "../../../entities/user-entity";
import { apiV1 } from '../../../libs/api';

export function useAllPosts() {
    async function getAllPosts({ pageParam = 1 }) {
        const response = await apiV1.get(
            `/getAllPost?page=${pageParam}&limit=10`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    const { data, isLoading,fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: getAllPosts,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 10 ? allPages.length + 1 : undefined;
        }
    });

    return {
        data,
        isLoading,
        getAllPosts,
        fetchNextPage,
        isFetchingNextPage,
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
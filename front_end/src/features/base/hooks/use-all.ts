import { useQuery } from "@tanstack/react-query";
import { PostEntity } from '../../../entities/post-entity';
import { apiV1 } from '../../../libs/api';
import { UserEntity } from "../../../entities/user-entity";
import Cookies from 'js-cookie';

export function useAllPosts() {
    async function getAllPosts() {
        const response = await apiV1.get<null, { data: PostEntity[] }>(
            `/getAllPost`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        return response.data;
    }

    const { data, isLoading } = useQuery<PostEntity[], Error, PostEntity[]>({
        queryKey: ['post'],
        queryFn: getAllPosts,
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
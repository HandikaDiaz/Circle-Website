
import { useQuery } from "@tanstack/react-query";
import { useParams } from 'react-router-dom';
import { GetPostEntity } from '../../../entities/post-entity';
import { apiV1 } from '../../../libs/api';

export function usePostProfile() {
    const { userId } = useParams<{ userId: string }>();

    async function getAllPosts() {
        const response = await apiV1.get<null, { data: GetPostEntity[] }>(
            `/profile/post/${userId}`
        );
        return response.data;
    }

    const { data, isLoading } = useQuery<GetPostEntity[], Error, GetPostEntity[]>({
        queryKey: ['post', userId],
        queryFn: getAllPosts,
        enabled: !!userId,
    });

    return {
        data,
        isLoading
    };
}
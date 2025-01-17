import { useQuery } from "@tanstack/react-query";
import { GetPostEntity } from '../../../entities/post-entity';
import { apiV1 } from '../../../libs/api';

export function usePostDetail(postId: number | null) {
    async function getPostById() {
        const response = await apiV1.get<{ data: GetPostEntity }>(
            `/post/status/${postId}`
        );
        
        return response.data.data;
    }

    const { data: postDetail, isLoading, error } = useQuery<GetPostEntity, Error>({
        queryKey: ['posts',postId],
        queryFn: getPostById,
    });

    return {
        postDetail,
        isLoading,
        error,
    };
}

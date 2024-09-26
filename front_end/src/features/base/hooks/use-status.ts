import { useQuery } from "@tanstack/react-query";
import { PostEntity } from '../../../entities/post-entity';
import { apiV1 } from '../../../libs/api';
import { useAppSelector } from "../../../store/hooks/use.store";
import { useLocation } from "react-router-dom";

export function usePostDetail(postId: number) {
    async function getPostById() {
        const response = await apiV1.get<{ data: PostEntity }>(
            `/post/status/${postId}`
        );
        
        return response.data.data;
    }

    const { data: postDetail, isLoading, error } = useQuery<PostEntity, Error>({
        queryKey: ['post', postId],
        queryFn: getPostById,
        enabled: postId > 0
    });

    return {
        postDetail,
        isLoading,
        error,
    };
}

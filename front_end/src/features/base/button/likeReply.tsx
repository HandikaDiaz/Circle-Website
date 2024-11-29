import React, { useEffect } from "react"
import { apiV1 } from "../../../libs/api";
import Cookies from 'js-cookie';
import { ButtonLink } from "./link";
import { FaHeart } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface LikeButtonProps {
    replyId: number | any
}

const LikeButtonReply: React.FC<LikeButtonProps> = ({ replyId }: any) => {
    const [isLiked, setIsLiked] = React.useState(false);
    const [, setLikeCount] = React.useState(0);
    const queryClient = useQueryClient();

    const fetchLike = async () => {
        const response = await apiV1.get(`/reply/${replyId}/like`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        setIsLiked(response.data.isLiked);
        setLikeCount(response.data.likesCount);
    }
    useEffect(() => {
        fetchLike();
    }, [replyId]);

    const mutation = useMutation<void, Error, void>({
        mutationFn: async () => {
            await apiV1.post(`/reply/${replyId}/like`, {}, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });
        },
        onSuccess: () => {
            setIsLiked((prev) => {
                const newLikedStatus = !prev;
                setLikeCount((prevCount) =>
                    newLikedStatus ? prevCount + 1 : prevCount - 1
                );
                return newLikedStatus;
            });

            queryClient.invalidateQueries({
                predicate: (query) => {
                    console.log(query.queryKey);
                    return query.queryKey[0] === 'reply' && query.queryKey[1] === +replyId

                }
            });
            queryClient.invalidateQueries({ queryKey: ['reply-post'] });
        },
    });

    const handleLike = () => {
        mutation.mutate();
    };

    const likeIconRed = <FaHeart style={{ color: 'red', fontSize: '18px', marginRight: '5px' }} />
    const likeIconGray = <FaHeart style={{ color: 'gray', fontSize: '18px', marginRight: '5px' }} />

    return (
        <ButtonLink fontSize={'12px'} to={''} onClick={handleLike} >
            {isLiked ? likeIconRed : likeIconGray}
        </ButtonLink>
    );
}

export default LikeButtonReply;
import React, { useEffect } from "react"
import { apiV1 } from "../../../libs/api";
import Cookies from 'js-cookie';
import { ButtonLink } from "./link";
import { FaHeart } from "react-icons/fa";

interface LikeButtonProps {
    postId: number
}

const LikeButtonPost: React.FC<LikeButtonProps> = ({ postId }) => {
    const [isLiked, setIsLiked] = React.useState(false);
    const [likeCount, setLikeCount] = React.useState(0);

    useEffect(() => {
        const fetchLike = async () => {
            const response = await apiV1.get(`/post/${postId}/like`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            });
            setIsLiked(response.data.isLiked);
            setLikeCount(response.data.likesCount);
        }
        fetchLike();
    }, [postId]);

    const handleLike = async () => {
        await apiV1.post(`/post/${postId}/like`, {}, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        setIsLiked((prev) => !prev);
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    };
    const likeIconRed = <FaHeart style={{ color: 'red', fontSize: '18px', marginRight: '5px' }} />
    const likeIconGray = <FaHeart style={{ color: 'gray', fontSize: '18px', marginRight: '5px' }} />

    return (
        <ButtonLink fontSize={'12px'} to={''} onClick={handleLike} >
            {isLiked ? likeIconRed : likeIconGray}
        </ButtonLink>
    );
}

export default LikeButtonPost;
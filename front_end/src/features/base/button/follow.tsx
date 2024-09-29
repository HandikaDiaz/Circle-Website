import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { apiV1 } from "../../../libs/api";
import { ButtonLink } from "./link";

interface FollowButtonProps {
    userId: number
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId }) => {
    const [isFollow, setIsFollow] = React.useState(false);
    const [buttonText, setButtonText] = useState<string>("Follow");

    useEffect(() => {
        const fetchFollow = async () => {
            const response = await apiV1.get(`/follow/${userId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            });

            setIsFollow(response.data.isFollowing);
            setButtonText(response.data.isFollowing ? "Following" : "Follow");
        }
        fetchFollow();
    }, [userId]);

    const handleFollow = async () => {
        try {
            const response = await apiV1.patch(`/follow/${userId}`, {}, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            });
            const newFollowStatus = response.data.isFollowing;

            setIsFollow(newFollowStatus);
            setButtonText(newFollowStatus ? "Following" : "Follow");
        } catch (error) {
            console.error("Error toggling follow status:", error);
        }
    };

    return (
        <ButtonLink
            to={''}
            height={'28px'}
            fontSize={'11px'}
            bg={'transparent'}
            color={'nav.text'}
            fontWeight={'700'}
            padding={'5px 13px'}
            onClick={handleFollow}
            borderRadius={'20px'}
            border={'1px solid #FFFFFF'}>
            {buttonText}
        </ButtonLink>
    );
}

export default FollowButton;
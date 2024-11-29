import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { apiV1 } from "../../../libs/api";
import { ButtonLink } from "./link";

interface FollowButtonProps {
    userId: number
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId }) => {
    const [, setIsFollow] = React.useState(false);
    const [buttonText, setButtonText] = useState<string>("Follow");
    const queryClient = useQueryClient();

    const fetchFollow = async () => {
        try {
            const response = await apiV1.get(`/follow/${userId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            }); 

            setIsFollow(response.data.isFollowing);
            setButtonText(response.data.isFollowing ? "Following" : "Follow");
        } catch (error) {
            console.error("Error fetching follow status:", error);
        }
    };
    useEffect(() => {
        fetchFollow();
    }, [userId]);

    const mutation = useMutation<void, Error, void>({
        mutationFn: async () => {
            await apiV1.patch(`/follow/${userId}`, {}, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            });
        },
        onSuccess: () => {
            setIsFollow((prev) => {
                const newFollowStatus = !prev;
                setButtonText(newFollowStatus ? "Following" : "Follow");
                return newFollowStatus;
            });

            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });

    const handleFollow = () => {
        mutation.mutate();
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
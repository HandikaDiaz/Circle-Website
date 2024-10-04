import { Box, Image, Text } from "@chakra-ui/react";
import { FaComments, FaHeart } from "react-icons/fa";
import { usePostDetail } from "../../hooks/use-status";
import { ButtonLink } from "../../button/link";
import { useParams } from "react-router-dom";
import { format } from 'date-fns';
import LikeButtonPost from "../../button/like";

export function StatusPost() {
    const { postId } = useParams<{ postId: string }>();
    const { postDetail, isLoading, error } = usePostDetail(parseInt(postId!));
    function formatCreatedAt(dateString: any) {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                throw new Error("Invalid date");
            }
            return format(date, "hh:mm a • MMM dd yyyy");
        } catch (error) {
            console.log(error);
            return "";
        }
    }

    return (
        <Box
            mt={'10px'}
            px={'25px'}
            pb={'15px'}
            color={'home.text'}
            alignItems={'center'}
            borderBottom={'1px solid #3F3F3F'}>
            <Box
                display={'flex'}
                alignItems={'center'}>
                <Image
                    alt=''
                    boxSize='40px'
                    borderRadius='500px'
                    src={postDetail?.author.image} />

                <ButtonLink to={"/profile-people"}>
                    <Box ms={'10px'} fontSize={'12px'}>
                        <Text fontWeight={'bold'}>{postDetail?.author.fullName}</Text>
                        <Text color={'home.link'}>@{postDetail?.author.userName} • {postDetail?.timeAgo}</Text>
                    </Box>
                </ButtonLink>
            </Box>

            <Box fontSize={'12px'} mt={'10px'}>
                <Text mt={'5px'}>
                    {postDetail?.content}
                </Text>
                {postDetail?.image !== null && <Image my={'13px'} src={postDetail?.image} />}
                <Text
                    fontSize={'12px'}
                    color={'home.link'}
                    mt={'10px'}>{postDetail?.createdAt ? formatCreatedAt(postDetail.createdAt) : "Date not available"}</Text>

                <Text
                    mt={'10px'}
                    display={'flex'}
                    fontSize={'20px'}
                    alignItems={'center'}>
                    <LikeButtonPost postId={postDetail?.id} />
                    <Text
                        ms={'5px'}
                        as={'span'}
                        fontSize={'12px'}
                        color={'home.link'}>{postDetail?.likesCount}</Text>

                    <ButtonLink to={"/status"} display={'flex'}>
                        <FaComments style={{ color: '#909090', marginLeft: '20px' }} />
                        <Text
                            ms={'5px'}
                            as={'span'}
                            fontSize={'12px'}
                            color={'home.link'}>{postDetail?.repliesCount} Replies</Text>
                    </ButtonLink>
                </Text>
            </Box>
        </Box>
    )
}
import { Box, Image, Text } from "@chakra-ui/react";
import { FaComments } from "react-icons/fa";
import LikeButtonPost from "../../base/button/likePost";
import { ButtonLink } from "../../base/button/link";
import { useAllPosts } from "../../base/hooks/use-all";
import { DeletePostButton } from "../../base/button/deletePost";
import { useEffect } from "react";
import { useIntersection } from "@mantine/hooks";

export function DeletePost() {
    const { data, fetchNextPage, refetch } = useAllPosts();
    const { ref, entry } = useIntersection({
        root: null,
        threshold: 1
    })

    useEffect(() => {
        if (entry?.isIntersecting) fetchNextPage()
    }, [entry])
    const _posts = data?.pages?.flatMap((page) => page) || [];

    return (
        <>
            {_posts?.map((post, index) => {
                return (
                    <Box
                        mt={'20px'}
                        px={'25px'}
                        pb={'15px'}
                        color={'home.text'}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        borderBottom={'1px solid #3F3F3F'}
                        ref={index === _posts.length - 1 ? ref : undefined}>
                        <Box
                            display={'flex'}>
                            <Image
                                alt=''
                                boxSize='40px'
                                borderRadius='500px'
                                src={post.author.image} />

                            <Box ms={'10px'} w={'430px'}>
                                <Text
                                    fontSize={'12px'}
                                    fontWeight={'bold'}>{post.author.fullName}
                                    <Text
                                        as={'span'}
                                        color={'home.link'}
                                        ms={'3px'}>@{post.author.userName} • {post.timeAgo}</Text>
                                </Text>

                                <Text
                                    fontSize={'12px'}
                                    mt={'5px'}>{post.content}</Text>

                                {post.image !== null && <Image my={'13px'} src={post.image} />}

                                <Text
                                    mt={'15px'}
                                    display={'flex'}
                                    fontSize={'20px'}
                                    alignItems={'center'}>
                                    <LikeButtonPost postId={post.id} />
                                    <Text
                                        as={'span'}
                                        color={'home.link'}
                                        fontSize={'12px'}>{post.likesCount}</Text>

                                    <FaComments style={{ color: '#909090', marginLeft: '20px' }} />
                                    <ButtonLink state={post.id} to={`/status/${post.id}`} display={'flex'}>
                                        <Text
                                            ms={'5px'}
                                            as={'span'}
                                            color={'home.link'}
                                            fontSize={'12px'}>{post.repliesCount} Replies</Text>
                                    </ButtonLink>
                                </Text>
                            </Box>
                            <DeletePostButton postId={post.id} onSuccess={refetch}>
                            </DeletePostButton>
                        </Box>
                    </Box>
                )
            })}
        </>
    )
}
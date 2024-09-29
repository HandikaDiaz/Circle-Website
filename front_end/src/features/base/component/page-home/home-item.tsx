import { Box, Image, Text } from "@chakra-ui/react";
import { FaComments } from "react-icons/fa";
import LikeButtonPost from "../../button/like";
import { ButtonLink } from "../../button/link";
import { useAllPosts } from "../../hooks/use-all";

export function HomeItem() {
    const { data } = useAllPosts();
    
    return (
        <>
            {data?.map((post) => {
                return (
                    <Box
                        mt={'20px'}
                        px={'25px'}
                        pb={'15px'}
                        key={post.id}
                        color={'home.text'}
                        alignItems={'center'}
                        borderBottom={'1px solid #3F3F3F'}>
                        <Box
                            display={'flex'}>
                            <Image
                                alt=''
                                boxSize='40px'
                                borderRadius='500px'
                                src='https://bit.ly/dan-abramov' />

                            <Box ms={'10px'}>
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

                                {post.image !== null && <Image src={post.image}/>}

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
                        </Box>
                    </Box>
                )
            })}
        </>
    )
}
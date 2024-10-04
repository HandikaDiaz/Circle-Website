import { Box, Image, Text } from "@chakra-ui/react";
import LikeButton from "../../button/like";
import { useAllReplies } from "../../hooks/use-all";

export function StatusItem() {
    const { data } = useAllReplies();
    
    return (
        <>
            {data?.map((reply) => {
                return (
                    <Box
                        mt={'20px'}
                        px={'25px'}
                        pb={'15px'}
                        color={'home.text'}
                        alignItems={'center'}
                        borderBottom={'1px solid #3F3F3F'}>
                        <Box
                            display={'flex'}>
                            <Image
                                alt=''
                                boxSize='40px'
                                borderRadius='500px'
                                src={reply.author.image} />

                            <Box ms={'10px'}>
                                <Text
                                    fontSize={'12px'}
                                    fontWeight={'bold'}>{reply.author.fullName}
                                    <Text
                                        as={'span'}
                                        color={'home.link'}
                                        ms={'3px'}>@{reply.author.userName} • {reply.timeAgo}</Text>
                                </Text>

                                <Text
                                    fontSize={'12px'}
                                    mt={'5px'}>{reply.content}</Text>

                                {reply.image !== null && <Image my={'13px'} src={reply.image} />}

                                <Text
                                    mt={'15px'}
                                    display={'flex'}
                                    fontSize={'20px'}
                                    alignItems={'center'}>
                                    <LikeButton postId={reply.id} />
                                    <Text
                                        as={'span'}
                                        color={'home.link'}
                                        fontSize={'12px'}>{reply.likesCount}</Text>
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                )
            })}
        </>
    )
}
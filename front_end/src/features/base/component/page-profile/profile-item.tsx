import { Box, Image, Text } from "@chakra-ui/react";
import { FaComments, FaHeart } from "react-icons/fa";
import { usePostForm } from "../../hooks/use.post.form";


export function ProfilePost() {
    const { data } = usePostForm();

    return (
        <>
            {data?.map((post) => {
                return (
                    <Box
                        mt={'20px'}
                        pb={'15px'}
                        display={'flex'}
                        color={'#FFFFFF'}
                        alignItems={'center'}>
                        <Box
                            display={'flex'}>
                            <Image
                                alt=''
                                boxSize='40px'
                                borderRadius='500px'
                                src='https://bit.ly/dan-abramov' />

                                <Box ms={'10px'}>
                                    <Text fontSize={'12px'} fontWeight={'bold'}>{post.author.fullName}<Text as={'span'} color={'#909090'} ms={'3px'}>@{post.author.userName} • 4h</Text></Text>
                                    <Text fontSize={'12px'} mt={'5px'}>{post.content}</Text>
                                    <Text display={'flex'} alignItems={'center'} mt={'15px'} fontSize={'20px'}>
                                        <FaHeart style={{ color: 'red' }} />
                                        <Text as={'span'} ms={'5px'} color={'#909090'} fontSize={'12px'}>{post.likesCount}</Text>
                                        <FaComments style={{ color: '#909090', marginLeft: '20px' }} />
                                        <Text as={'span'} ms={'5px'} color={'#909090'} fontSize={'12px'}>{post.repliesCount} Replies</Text>
                                    </Text>
                                </Box>
                        </Box>
                    </Box>
                )
            })}
        </>
    )
}
import { Box, Button, Heading, Image, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { FaComments } from "react-icons/fa";
import LikeButtonPost from "../../button/likePost";
import { ButtonLink } from "../../button/link";
import { usePost } from "../../hooks/use-post";
import { PostModal } from "../modal/post-modal";


export function ProfilePost() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const { data } = usePost();
    if (!data || data.length === 0) {
        return <Box justifyContent={'center'} display={'flex'} alignItems={'center'} flexDirection={'column'} mt={'30px'} pb={'15px'}>
            <Heading as={'text'} color={'nav.text'} fontSize={'15px'}>I think you dont have any post yet</Heading>
            <Button
                border={'none'}
                height={'35px'}
                onClick={onOpen}
                color={'nav.text'}
                fontSize={'15px'}
                cursor={'pointer'}
                fontWeight={'bold'}
                borderRadius={'20px'}
                backgroundColor='transparent'
                transition={'all 0.2s ease-in-out'}
                _hover={{ color: 'nav.button.hoverText' }}>Let's make your first post</Button>

            <PostModal
                isOpen={isOpen}
                onClose={onClose}
                initialRef={initialRef}
                finalRef={finalRef} />
        </Box>
    }

    return (
        <>
            {data?.map((post) => {
                return (
                    <Box
                        mt={'20px'}
                        pb={'15px'}
                        display={'flex'}
                        color={'#FFFFFF'}
                        alignItems={'center'}
                        borderBottom={'1px solid #3F3F3F'}>
                        <Box
                            display={'flex'}>
                            <Image
                                alt=''
                                boxSize='40px'
                                borderRadius='500px'
                                src={post.author.image} />

                            <Box ms={'10px'}>
                                <Text fontSize={'12px'} fontWeight={'bold'}>{post.author.fullName}<Text as={'span'} color={'#909090'} ms={'3px'}>@{post.author.userName} • 4h</Text></Text>
                                <Text fontSize={'12px'} mt={'5px'}>{post.content}</Text>
                                <Text display={'flex'} alignItems={'center'} mt={'15px'} fontSize={'20px'}>
                                    <LikeButtonPost postId={post.id} />
                                    <Text as={'span'} ms={'5px'} color={'#909090'} fontSize={'12px'}>{post.likesCount}</Text>
                                    <FaComments style={{ color: '#909090', marginLeft: '20px' }} />
                                    <ButtonLink to={`/status/${post.id}`} display={'flex'}>
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
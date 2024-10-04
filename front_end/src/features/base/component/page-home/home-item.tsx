import { Box, Image, Text, useDisclosure } from "@chakra-ui/react";
import { FaComments } from "react-icons/fa";
import LikeButtonPost from "../../button/like";
import { ButtonLink } from "../../button/link";
import { useAllPosts } from "../../hooks/use-all";
import { DetailLayout } from "../../layout/detail-layout";
import React, { useState } from "react";

export function HomeItem() {
    const { data } = useAllPosts();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

    return (
        <>
            {data?.map((post) => {
                return (
                    <Box
                        mt={'20px'}
                        px={'25px'}
                        className={`${post.id}`}
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

                                {post.image !== null &&
                                    <Image
                                        my={'13px'}
                                        src={post.image}
                                        onClick={() => {
                                            setSelectedImage(post.image as string | null);
                                            setSelectedPostId(post.id);
                                            onOpen();
                                        }}
                                    />
                                }

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
            <DetailLayout
                isOpen={isOpen}
                onClose={onClose}
                initialRef={initialRef}
                finalRef={finalRef}
                selectedImage={selectedImage}
                selectedPostId={selectedPostId} />
        </>
    )
}
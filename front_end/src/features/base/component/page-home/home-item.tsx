import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Button, Image, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { useIntersection } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { FaComments } from "react-icons/fa";
import LikeButtonPost from "../../button/likePost";
import { ButtonLink } from "../../button/link";
import { useAllPosts } from "../../hooks/use-all";
import { DetailLayout } from "../../layout/detail-layout";
import DeleteModal from "../modal/delete-modal";
import EditModal from "../modal/edit-modal";
import Cookies from "js-cookie";

export function HomeItem() {
    const { data, fetchNextPage, isFetchingNextPage } = useAllPosts();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
    const { ref, entry } = useIntersection({
        root: null,
        threshold: 1
    });
    const token = Cookies.get('token');
    let userLogin = null;
    if (token) {
        try {
            const payloadBase64 = token.split('.')[1];
            if (payloadBase64) {
                const decodedPayload = JSON.parse(atob(payloadBase64));
                userLogin = decodedPayload;
            }

        } catch (error) {
            console.error('Failed to decode token:', error);
        }
    };

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
                        className={`${post.id}`}
                        pb={'15px'}
                        key={post.id}
                        color={'home.text'}
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
                                    alignItems={'center'}
                                    display={'flex'}
                                    fontWeight={'bold'}>{post.author.fullName}
                                    <Box
                                        display={'flex'}
                                        alignItems={'center'}
                                        width={'100%'}
                                        justifyContent={'space-between'}>
                                        <Text
                                            as={'span'}
                                            color={'home.link'}
                                            ms={'3px'}>@{post.author.userName} • {post.timeAgo}</Text>
                                        {userLogin?.id === post.authorId &&
                                            <Menu isLazy>
                                                <MenuButton
                                                    transition='all 0.2s'
                                                    _hover={{ color: '#464646' }}> <ChevronDownIcon />
                                                </MenuButton>
                                                <MenuList bg={'#1d1d1d'}>
                                                    <MenuItem justifyContent={'center'} bgColor={'transparent'}>
                                                        <Button
                                                            onClick={() => {
                                                                onOpenEdit();
                                                                setSelectedPostId(post.id);
                                                            }}
                                                            bgColor={'transparent'}
                                                            _hover={{ bgColor: 'transparent', color: '#04a51e' }}
                                                            color={'#F0F0F0'}>Edit</Button>
                                                    </MenuItem>
                                                    <MenuDivider />
                                                    <MenuItem justifyContent={'center'} bgColor={'transparent'}>
                                                        <Button
                                                            bgColor={'transparent'}
                                                            onClick={() => {
                                                                onOpenDelete();
                                                                setSelectedPostId(post.id);
                                                            }}
                                                            _hover={{ bgColor: 'transparent', color: '#FF0000' }}
                                                            color={'#F0F0F0'}>Delete</Button>
                                                    </MenuItem>
                                                </MenuList>
                                            </Menu>
                                        }
                                    </Box>
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
            {isFetchingNextPage && <Spinner size='sm' />}
            <DetailLayout
                isOpen={isOpen}
                onClose={onClose}
                initialRef={initialRef}
                finalRef={finalRef}
                selectedImage={selectedImage}
                selectedPostId={selectedPostId} />
            <DeleteModal
                isOpen={isOpenDelete}
                onClose={onCloseDelete}
                initialRef={initialRef}
                finalRef={finalRef}
                selectedPostId={selectedPostId} />
            <EditModal
                isOpen={isOpenEdit}
                onClose={onCloseEdit}
                initialRef={initialRef}
                finalRef={finalRef}
                selectedPostId={selectedPostId} />
        </>
    )
}
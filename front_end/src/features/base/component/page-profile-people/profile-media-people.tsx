import { Box, Heading, Image, useDisclosure } from "@chakra-ui/react";
import { usePostProfile } from "../../hooks/use-profile";
import React, { useState } from "react";
import { DetailLayout } from "../../layout/detail-layout";
import { useMediaReplies } from "../../hooks/use-all";


export function ProfileMediaPeople() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const { data } = usePostProfile();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
    
    if (!data || data.length === 0) {
        return <Box justifyContent={'center'} display={'flex'} alignItems={'center'} flexDirection={'column'} mt={'30px'} pb={'15px'}>
            <Heading as={'text'} color={'nav.text'} fontSize={'15px'}>I think this user dont have any post yet</Heading>
        </Box>
    }
    return (
        <Box
            mt={'20px'}
            pb={'15px'}
            display={'flex'}
            color={'#FFFFFF'}
            justifyContent={'center'}
            alignItems={'center'}>
            <Box
                display={'flex'}
                flexWrap={'wrap'}
                justifyContent={'center'}
                width={'1000px'}
                gap={'5px'}>
                {data?.map((post) => {
                    return (
                        <>
                            {post.image !== null  && <Image
                                boxSize='155px'
                                key={post.id}
                                onClick={() => {
                                    setSelectedImage(post.image as string | null);
                                    setSelectedPostId(post.id);
                                    onOpen();
                                }}
                                objectFit='cover'
                                src={post?.image}
                                alt='Dan Abramov' />}
                        </>
                    )
                })}
            </Box>
            <DetailLayout
                isOpen={isOpen}
                onClose={onClose}
                initialRef={initialRef}
                finalRef={finalRef}
                selectedImage={selectedImage}
                selectedPostId={selectedPostId} />
        </Box>
    )
}
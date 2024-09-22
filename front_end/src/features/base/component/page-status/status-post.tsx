import { Box, Image, Text } from "@chakra-ui/react";
import { FaComments, FaHeart } from "react-icons/fa";
import { ButtonLink } from "../../link/link";
import { usePostForm } from "../../hooks/use.post.form";


export function StatusPost() {
    const { data } = usePostForm();
    
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
                    src='https://bit.ly/dan-abramov' />

                <ButtonLink to={"/profile-people"}>
                <Box ms={'10px'} fontSize={'12px'}>
                    <Text fontWeight={'bold'}>{data?.map((post) => post.author.fullName)}</Text>
                    <Text color={'home.link'}>@{data?.map((post) => post.author.userName)} • 4h</Text>
                </Box>
                </ButtonLink>
            </Box>

            <Box fontSize={'12px'} mt={'10px'}>
                <Text mt={'5px'}>
                    {data?.map((post) => post.content)}
                </Text>
                <Text
                    fontSize={'12px'}
                    color={'home.link'}
                    mt={'10px'}>11:32 PM • Jul 26 2023</Text>

                <Text
                    mt={'10px'}
                    display={'flex'}
                    fontSize={'20px'}
                    alignItems={'center'}>
                    <FaHeart style={{ color: 'red' }} />
                    <Text
                        ms={'5px'}
                        as={'span'}
                        fontSize={'12px'}
                        color={'home.link'}>{data?.map((post) => post.likesCount)}</Text>

                    <ButtonLink to={"/status"} display={'flex'}>
                    <FaComments style={{ color: '#909090', marginLeft: '20px' }} />
                        <Text
                            ms={'5px'}
                            as={'span'}
                            fontSize={'12px'}
                            color={'home.link'}>{data?.map((post) => post.repliesCount)} Replies</Text>
                    </ButtonLink>
                </Text>
            </Box>
        </Box>
    )
}
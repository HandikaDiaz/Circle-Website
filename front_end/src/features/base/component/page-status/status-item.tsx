import { Box, Image, Text } from "@chakra-ui/react";
import { FaComments, FaHeart } from "react-icons/fa";
import { useReplyForm } from "../../hooks/use.reply.form";
import { ButtonLink } from "../../link/link";

export function StatusItem() {
    const { data } = useReplyForm();
    console.log(data);

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
                                src='https://bit.ly/dan-abramov' />

                            <Box ms={'10px'}>
                                <Text
                                    fontSize={'12px'}
                                    fontWeight={'bold'}>{reply.author.fullName}
                                    <Text
                                        as={'span'}
                                        color={'home.link'}
                                        ms={'3px'}>@{reply.author.userName} • 4h</Text>
                                </Text>

                                <Text
                                    fontSize={'12px'}
                                    mt={'5px'}>{reply.content}</Text>
                                <Text
                                    mt={'15px'}
                                    display={'flex'}
                                    fontSize={'20px'}
                                    alignItems={'center'}>
                                    <FaHeart style={{ color: 'red' }} />
                                    <Text
                                        ms={'5px'}
                                        as={'span'}
                                        color={'home.link'}
                                        fontSize={'12px'}>{reply.likesCount}</Text>

                                    <FaComments style={{ color: '#909090', marginLeft: '20px' }} />
                                    <ButtonLink to={"/status"} display={'flex'}>
                                        <Text
                                            ms={'5px'}
                                            as={'span'}
                                            color={'home.link'}
                                            fontSize={'12px'}>{reply.repliesCount} Replies</Text>
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
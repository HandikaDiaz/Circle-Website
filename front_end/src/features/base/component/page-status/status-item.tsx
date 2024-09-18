import { Box, Image, Text } from "@chakra-ui/react";
import { FaComments, FaHeart } from "react-icons/fa";
import { ButtonLink } from "../../link/link";


export function StatusItem() {
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
                    <Text fontWeight={'bold'}>Indah Pra Karya</Text>
                    <Text color={'home.link'}>@indahprakarya • 4h</Text>
                </Box>
                </ButtonLink>
            </Box>

            <Box fontSize={'12px'} mt={'10px'}>
                <Text mt={'5px'}>Kalian pernah ga sih bet on saving? Jadi by calculation sebenernya kita ga survive sampe tanggal tertentu. Tapi entah gimana bisa aja gitu. Ada aja jalannya augmented reality real time puppet I made. You can try it now went below in the thread.</Text>
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
                        color={'home.link'}>36</Text>

                    <ButtonLink to={"/status"} display={'flex'}>
                    <FaComments style={{ color: '#909090', marginLeft: '20px' }} />
                        <Text
                            ms={'5px'}
                            as={'span'}
                            fontSize={'12px'}
                            color={'home.link'}>381 Replies</Text>
                    </ButtonLink>
                </Text>
            </Box>
        </Box>
    )
}
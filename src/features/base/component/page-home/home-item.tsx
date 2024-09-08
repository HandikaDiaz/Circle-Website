import { Box, Image, Text } from "@chakra-ui/react";
import { FaComments, FaHeart } from "react-icons/fa";
import { ButtonLink } from "../../link/link";


export function HomeItem() {
    return (
        <Box
            mt={'20px'}
            px={'25px'}
            pb={'15px'}
            display={'flex'}
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
                        fontWeight={'bold'}>Indah Pra Karya
                        <Text
                            as={'span'}
                            color={'home.link'}
                            ms={'3px'}>@indahprakarya • 4h</Text>
                    </Text>

                    <Text
                        fontSize={'12px'}
                        mt={'5px'}>Kalian pernah ga sih bet on saving? Jadi by calculation sebenernya kita ga survive sampe tanggal tertentu. Tapi entah gimana bisa aja gitu. Ada aja jalannya augmented reality real time puppet I made. You can try it now went below in the thread.</Text>

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
                            fontSize={'12px'}>36</Text>

                        <FaComments style={{ color: '#909090', marginLeft: '20px' }} />
                        <ButtonLink to={"/status"} display={'flex'}>
                            <Text
                                ms={'5px'}
                                as={'span'}
                                color={'home.link'}
                                fontSize={'12px'}>381 Replies</Text>
                        </ButtonLink>
                    </Text>
                </Box>
            </Box>
        </Box>
    )
}
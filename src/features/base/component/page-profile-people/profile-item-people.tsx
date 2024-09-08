import { Box, Image, Text } from "@chakra-ui/react";
import { FaComments, FaHeart } from "react-icons/fa";


export function ProfilePostPeople() {
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
                    <Text fontSize={'12px'} fontWeight={'bold'}>Indah Pra Karya <Text as={'span'} color={'#909090'} ms={'3px'}>@indahprakarya • 4h</Text></Text>
                    <Text fontSize={'12px'} mt={'5px'}>Kalian pernah ga sih bet on saving? Jadi by calculation sebenernya kita ga survive sampe tanggal tertentu. Tapi entah gimana bisa aja gitu. Ada aja jalannya augmented reality real time puppet I made. You can try it now went below in the thread.</Text>
                    <Text display={'flex'} alignItems={'center'} mt={'15px'} fontSize={'20px'}>
                        <FaHeart style={{color:'red'}}/>
                        <Text as={'span'} ms={'5px'} color={'#909090'} fontSize={'12px'}>36</Text>
                        <FaComments style={{color:'#909090', marginLeft:'20px'}}/>
                        <Text as={'span'} ms={'5px'} color={'#909090'} fontSize={'12px'}>381 Replies</Text>
                    </Text>
                </Box>
            </Box>
        </Box>
    )
}
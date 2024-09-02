import { IoHeartOutline } from "react-icons/io5";
import { Box, Button, Heading, ListItem, UnorderedList, Text } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { RiUserSearchLine } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";

export function SideLeftNavbar() {
return (
    <Box
        width={'275px'}
        height={'100vh'}
        position={'fixed'}
        marginLeft={'5px'}
        borderRight={'1px solid #545454'}>

        <Heading 
                as='h1' 
                mx="auto"
                color="#04A51E"
                width={"180px"}
                display={"flex"}
                fontSize={'40px'} 
                paddingTop={'25px'}
                alignItems="center" 
                paddingBottom={'5px'}
                justifyContent="center">circle</Heading>

        <UnorderedList 
            gap={'30px'} 
            width={'235px'}
            display={'flex'} 
            fontSize={'20px'} 
            color={'#FFFFFF'} 
            marginTop={'15px'}
            listStyleType={'none'}
            flexDirection={'column'}>

                <ListItem 
                    as={'a'} 
                    href="#" 
                    gap={'5px'}
                    alignItems={'center'} 
                    textDecoration={'none'} 
                    color={'white'} display={'flex'}>
                    <FaHome style={{marginRight:'10px'}}/>Home</ListItem>

                <ListItem 
                    as={'a'} 
                    href="#" 
                    gap={'5px'}
                    color={'white'} 
                    display={'flex'} 
                    alignItems={'center'} 
                    textDecoration={'none'}>
                    <RiUserSearchLine style={{marginRight:'10px'}}/>Search</ListItem>

                <ListItem 
                    as={'a'} 
                    href="#" 
                    gap={'5px'}
                    color={'white'} 
                    display={'flex'} 
                    alignItems={'center'}
                    textDecoration={'none'}> 
                    <IoHeartOutline style={{marginRight:'10px'}}/>Follows</ListItem>

                <ListItem 
                    as={'a'} 
                    href="#" 
                    gap={'5px'}
                    color={'white'} 
                    display={'flex'} 
                    alignItems={'center'} 
                    textDecoration={'none'}> 
                    <CgProfile style={{marginRight:'10px'}}/>Profile</ListItem>

                <ListItem 
                    as={'a'} 
                    href="#" 
                    gap={'5px'}
                    color={'white'} 
                    display={'flex'} 
                    alignItems={'center'} 
                    textDecoration={'none'}> 
                    <Button
                        width={'95%'}
                        border={'none'}
                        height={'35px'}
                        color={'#FFFFFF'}
                        fontSize={'15px'}
                        colorScheme='blue'
                        fontWeight={'bold'}
                        borderRadius={'20px'}
                        backgroundColor={'#04A51E'}>Create Post</Button>
                </ListItem>
        </UnorderedList>

        <Text
            as={'a'}
            href="#"
            gap={'15px'}
            width={'235px'}
            display={'flex'} 
            color={'#FFFFFF'}
            fontSize={'20px'} 
            marginTop={'230px'}
            marginLeft={'20px'}
            alignItems={'center'}
            textDecoration={'none'}><TbLogout2 />Logout</Text>
    </Box>
);
}
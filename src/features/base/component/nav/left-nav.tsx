import { Box, Button, Heading, ListItem, Text, UnorderedList, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import { RiUserSearchLine } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { ButtonLink } from "../../link/link";
import { PostModal } from "../modal/post-modal";

export function SideLeftNavbar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    return (
        <Box>
            <Heading
                as='h1'
                ms={'20px'}
                color="nav.title1"
                display={"flex"}
                fontSize={'40px'}
                paddingTop={'20px'}
                paddingBottom={'5px'}>circle</Heading>

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
                    gap={'5px'}
                    alignItems={'center'}
                    textDecoration={'none'}
                    color={'nav.text'} display={'flex'}>
                    <FaHome style={{ marginRight: '10px' }} />
                    <ButtonLink color={'nav.text'} to={"/"}>Home</ButtonLink>
                </ListItem>

                <ListItem
                    gap={'5px'}
                    color={'nav.text'}
                    display={'flex'}
                    alignItems={'center'}
                    textDecoration={'none'}>
                    <RiUserSearchLine style={{ marginRight: '10px' }} />
                    <ButtonLink color={'nav.text'} to={"/search"}>Search</ButtonLink>
                </ListItem>

                <ListItem
                    gap={'5px'}
                    color={'nav.text'}
                    display={'flex'}
                    alignItems={'center'}
                    textDecoration={'none'}>
                    <IoHeartOutline style={{ marginRight: '10px' }} />
                    <ButtonLink color={'nav.text'} to={"/search"}>Follows</ButtonLink>
                </ListItem>

                <ListItem
                    gap={'5px'}
                    color={'nav.text'}
                    display={'flex'}
                    alignItems={'center'}
                    textDecoration={'none'}>
                    <CgProfile style={{ marginRight: '10px' }} />
                    <ButtonLink color={'nav.text'} to={"/profile"}>Profile</ButtonLink>
                </ListItem>

                <ListItem
                    gap={'5px'}
                    color={'nav.text'}
                    display={'flex'}
                    alignItems={'center'}
                    textDecoration={'none'}>
                    <Button
                        width={'100%'}
                        border={'none'}
                        height={'35px'}
                        onClick={onOpen}
                        color={'nav.text'}
                        fontSize={'15px'}
                        cursor={'pointer'}
                        fontWeight={'bold'}
                        borderRadius={'20px'}
                        backgroundColor={'nav.button.background'}
                        transition={'all 0.2s ease-in-out'}
                        _hover={{ backgroundColor: 'nav.button.hoverBackground', color: 'nav.button.hoverText' }}>Create Post</Button>
                </ListItem>
            </UnorderedList>

            <Text
                gap={'15px'}
                display={'flex'}
                color={'nav.text'}
                fontSize={'20px'}
                marginTop={'220px'}
                marginLeft={'20px'}
                alignItems={'center'}
                textDecoration={'none'}>
                <TbLogout2 />
                <ButtonLink color={'nav.text'} to={"/register"}>Logout</ButtonLink>
            </Text>


            <PostModal
                isOpen={isOpen}
                onClose={onClose}
                initialRef={initialRef}
                finalRef={finalRef} />
        </Box>
    );
}
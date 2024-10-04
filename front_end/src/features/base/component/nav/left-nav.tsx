import { Box, Button, Heading, ListItem, Text, UnorderedList, useDisclosure } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import { RiDashboardHorizontalFill, RiUserSearchLine } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { ButtonLink } from "../../button/link";
import { useLogout } from "../../hooks/use-logout";
import { PostModal } from "../modal/post-modal";

export function SideLeftNavbar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const logout = useLogout();
    const token = Cookies.get("token");
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
    }

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
                    <ButtonLink color={'nav.text'} to={"/follow"}>Follows</ButtonLink>
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

                {userLogin && userLogin.role === "ADMIN" ? (
                    <ListItem
                        gap={'5px'}
                        color={'nav.text'}
                        display={'flex'}
                        alignItems={'center'}
                        textDecoration={'none'}>
                        <RiDashboardHorizontalFill style={{ marginRight: '10px' }} />
                        <ButtonLink color={'nav.text'} to={"/admin"}>Dashboard</ButtonLink>
                    </ListItem>
                ) : (
                    <ListItem mb={'10px'} style={{ height: '20px' }} />
                )}

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
                marginTop={'165px'}
                marginLeft={'20px'}
                alignItems={'center'}
                textDecoration={'none'}>
                <TbLogout2 />
                <ButtonLink onClick={logout} color={'nav.text'} to={""}>Logout</ButtonLink>
            </Text>


            <PostModal
                isOpen={isOpen}
                onClose={onClose}
                initialRef={initialRef}
                finalRef={finalRef} />
        </Box>
    );
}
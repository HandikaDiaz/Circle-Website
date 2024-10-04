
import { Box, Text } from "@chakra-ui/react";
import { FollowItem } from "../component/page-follow/follow-item";

export function FollowLayout() {
    return (
        <Box
            mt={'20px'}
            px={'25px'}
            pb={'20px'}
            alignItems={'center'}
            justifyContent={'center'}>
            <Text color={'home.text'} as={'h1'}>Follow Account</Text>

            <FollowItem />
        </Box>
    )
}

import { Box } from "@chakra-ui/react";
import { AccFollowCard } from "../component/card/acc-follow-card";
import { AccFollowingCard } from "../component/card/acc-following-card";
import { SearchInput } from "../component/page-search/search-input";

export function FollowLayout() {
    return (
        <Box
            mt={'20px'}
            px={'25px'}
            pb={'20px'}
            alignItems={'center'}
            justifyContent={'center'}>

            <SearchInput />
            <AccFollowCard />
            <AccFollowingCard/>
        </Box>
    )
}
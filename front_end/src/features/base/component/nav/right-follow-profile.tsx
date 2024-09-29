import { Box } from "@chakra-ui/react";
import { MetaCard } from "../card/meta-card";
import { ProfileCard } from "../card/profile-card";

export function SideRightFollowNavbar() {
    return (
        <Box>
            <ProfileCard />
            <MetaCard />    
        </Box>
    )
}
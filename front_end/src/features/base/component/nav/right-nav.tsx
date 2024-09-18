import { Box } from "@chakra-ui/react";
import { ProfileCard } from "../card/profile-card";
import { SuggestionCard } from "../card/suggestion-card";
import { MetaCard } from "../card/meta-card";

export function SideRightNavbar() {
    return (
        <Box>
            <ProfileCard />
            <SuggestionCard />
            <MetaCard />    
        </Box>
    )
}
import { Box } from "@chakra-ui/react";
import { MetaCard } from "../card/meta-card";
import { SuggestionCard } from "../card/suggestion-card";

export function SideRightProfileNavbar() {
    return (
        <Box>
            <SuggestionCard />
            <MetaCard />    
        </Box>
    )
}
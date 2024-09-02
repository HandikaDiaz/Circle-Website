import { Box, Heading, Card } from "@chakra-ui/react";
import { AccFollowCard } from "./acc-follow-card";
import { AccFollowingCard } from "./acc-following-card";


export function SuggestionCard() {
    return (
        <Card
            mx={'auto'}
            mt={'20px'}
            width={'90%'}
            borderRadius={'5px'}
            paddingBottom={'20px'}
            backgroundColor={'#262626'}>
            <Box
                mx={'auto'}
                width={'90%'}
                bg={'#262626'}>
                <Heading
                    as='h3'
                    my={'15px'}
                    bg={'#262626'}
                    color={'#FFFFFF'}>Suggested for you</Heading>
                <AccFollowCard/>
                <AccFollowingCard/>
            </Box>
        </Card>
    )
}
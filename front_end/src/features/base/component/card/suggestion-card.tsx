import { Box, Card, Heading } from "@chakra-ui/react";
import { AccFollowCard } from "./acc-follow-card";


export function SuggestionCard() {
    return (
        <Card
            mx={'auto'}
            mt={'20px'}
            width={'90%'}
            borderRadius={'5px'}
            paddingBottom={'20px'}
            backgroundColor={'nav.background'}>
            <Box
                mx={'auto'}
                width={'90%'}>
                <Heading
                    my={'15px'}
                    fontSize={'23px'}
                    color={'nav.title2'}>Suggested for you</Heading>
                <AccFollowCard/>
            </Box>
        </Card>
    )
}
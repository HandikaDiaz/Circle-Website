import { Box, Text } from "@chakra-ui/react"

export function SearchNoResult() {
    return (
        <Box mx={'auto'} textAlign={'center'} mt={'150px'} fontSize={'14px'} width={'70%'}>
            <Text as={'h2'} color={'#909090'}>No results</Text>
            <Text as={'h3'} color={'#909090'}>Try searching for something else or check the spelling of what you typed.</Text>
        </Box>
    )
}
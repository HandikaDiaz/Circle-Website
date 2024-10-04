import { Box } from "@chakra-ui/react";
import { SearchInput } from "../component/page-search/search-input";

export function SearchLayout() {
    return (
        <Box
            mt={'20px'}
            px={'25px'}
            pb={'20px'}
            alignItems={'center'}
            justifyContent={'center'}>

            <SearchInput />
        </Box>
    )
}
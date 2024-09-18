
import { Box, Image } from "@chakra-ui/react";

export function DetailImage() {
    return(
        <Box 
            mx={'auto'} 
            mt={'20px'} 
            pb={'20px'} 
            pe={'25px'}
            display={'flex'} 
            alignItems={'center'} 
            justifyContent={'center'}>
            <Image
                onClick={() => window.open("https://img.lazcdn.com/g/p/fec87e282c953e23ab04692123dfc38c.jpg_960x960q80.jpg_.webp")}
                cursor={'pointer'}
                width={'auto'}
                height={'auto'}
                src="https://img.lazcdn.com/g/p/fec87e282c953e23ab04692123dfc38c.jpg_960x960q80.jpg_.webp" />
        </Box>
    )
}
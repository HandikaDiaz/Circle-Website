
import { Box, Image } from "@chakra-ui/react";

interface DetailImageProps {
    selectedImage: string | null;
}

export function DetailImage({ selectedImage }: DetailImageProps) {
    if (!selectedImage) return null; 
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
                onClick={() => window.open(selectedImage)}
                cursor={'pointer'}
                width={'auto'}
                height={'auto'}
                src={selectedImage}/>
        </Box>
    )
}
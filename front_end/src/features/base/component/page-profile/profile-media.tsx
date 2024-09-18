import { Box, Image, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { DetailLayout } from "../../layout/detail-layout";

export function ProfileMedia() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    return (
        <Box
            mt={'20px'} 
            pb={'15px'}
            display={'flex'} 
            color={'#FFFFFF'} 
            justifyContent={'center'}
            alignItems={'center'}>
            <Box 
                display={'flex'}
                flexWrap={'wrap'}
                justifyContent={'center'}
                width={'1000px'}
                gap={'5px'}>
                <Image
                    boxSize='150px'
                    onClick={onOpen}
                    objectFit='cover'
                    src='https://bit.ly/dan-abramov'
                    alt='Dan Abramov'/>
                <Image
                    boxSize='150px'
                    objectFit='cover'
                    src='https://bit.ly/dan-abramov'
                    alt='Dan Abramov'/>
                <Image
                    boxSize='150px'
                    objectFit='cover'
                    src='https://bit.ly/dan-abramov'
                    alt='Dan Abramov'/>
                
                </Box>
                <DetailLayout
                isOpen={isOpen}
                onClose={onClose}
                initialRef={initialRef}
                finalRef={finalRef} />
            </Box>
    )
}
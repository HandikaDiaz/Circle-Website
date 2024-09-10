import { Box, Text } from '@chakra-ui/react'
import { ResetForm } from "../../features/auth/component/reset-form";

export function ResetRoute() {
    return (
        <Box
            mx="auto"
            width={'350px'}
            alignItems="center"
            justifyContent="center">
            
            <Text 
                as='h1' 
                mx="auto"
                mt={"30px"}
                color="#04A51E"
                width={"300px"}
                display={"flex"}
                fontSize={"30px"}
                fontWeight={"bold"}
                alignItems="center" 
                justifyContent="start">circle</Text>

            <Text 
                as='h2'
                mx="auto"
                width={"300px"}
                color="#FFFFFF"
                display={"flex"}
                alignItems="center" 
                justifyContent="start">Reset Password</Text>

            <ResetForm />
        </Box>
    )
}
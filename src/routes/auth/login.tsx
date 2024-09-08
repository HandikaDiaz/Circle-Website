import { Link } from "react-router-dom";
import { LoginForm } from "../../features/auth/component/login-form";
import { Box, Heading, Text } from '@chakra-ui/react'

export function LoginRoute() {
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
                alignItems="center" 
                justifyContent="start">circle</Text>

            <Text 
                as='h2'
                mx="auto"
                width={"300px"}
                color="#FFFFFF"
                display={"flex"}
                alignItems="center" 
                justifyContent="start">Create account Circle</Text>

            <LoginForm />

            <Text 
                mx={"auto"}
                mt={"10px"}
                gap={'5px'}
                width={"300px"}
                fontSize='small' 
                display={"flex"}
                color={'#FFFFFF'}
                alignItems="center" 
                justifyContent="start">Don't have an account yet?
                <Link to={"/register"} style={{ textDecoration: 'none' }}>
                <Text 
                    href="" 
                    as={'a'} 
                    color={'#04A51E'} 
                    textDecoration={'none'}>Create account</Text>
                </Link>
            </Text>
        </Box>
    )
}
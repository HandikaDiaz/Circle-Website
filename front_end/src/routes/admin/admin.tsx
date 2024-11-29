import { Box } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { Navigate, Outlet } from "react-router-dom";
import { SideLeftNavbar } from "../../features/base/component/nav/left-nav";
import { SideRightNavbar } from "../../features/base/component/nav/right-nav";

export function Admin() {
    const token = Cookies.get("token");
    let userLogin = null;
    if (token) {
        try {
            const payloadBase64 = token.split('.')[1];
            if (payloadBase64) {
                const decodedPayload = JSON.parse(atob(payloadBase64));
                userLogin = decodedPayload;
            }
            
        } catch (error) {
            console.error('Failed to decode token:', error);
        }
    }
    if (userLogin.role !== "ADMIN") {
        return <Navigate to={"/"} />;
    }

    return (
        <Box display={'flex'} width={'100%'} height={'100vh'} bg={'#1D1D1D'} overflowY={'auto'}>
            <Box flex={1}>
                <SideLeftNavbar />
            </Box>
            <Box flex={2} overflowY={'auto'} borderRight={'1px solid #545454'} borderLeft={'1px solid #545454'}>
                <Outlet />
            </Box>
            <Box flex={1.5} overflowY={'auto'}>
                <SideRightNavbar />
            </Box>
        </Box>
    );
}
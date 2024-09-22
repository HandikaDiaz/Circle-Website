import { Box } from "@chakra-ui/react";
import { SideLeftNavbar } from "../../features/base/component/nav/left-nav";
import { SideRightNavbar } from "../../features/base/component/nav/right-nav";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks/use.store";


export function Base() {
    const user = useAppSelector((state) => state.auth);

    if (!Object.keys(user).length) return <Navigate to={"/login"}/>;

    if (!user.id) return <Navigate to={"/login"} />;
    
    return (
        <Box display={'flex'} width={'100%'} height={'100vh'} bg={'#1D1D1D'}>
            <Box flex={1}>
                <SideLeftNavbar />
            </Box>
            <Box flex={2} overflowY={'auto'} borderRight={'1px solid #545454'} borderLeft={'1px solid #545454'}>
                <Outlet/>
            </Box>
            <Box flex={1.5}>
                <SideRightNavbar />
            </Box>
        </Box>
    )
}
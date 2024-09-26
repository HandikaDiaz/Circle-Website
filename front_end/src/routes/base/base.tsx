import { Box } from "@chakra-ui/react";
import { SideLeftNavbar } from "../../features/base/component/nav/left-nav";
import { SideRightNavbar } from "../../features/base/component/nav/right-nav"; // Import the Profile right navbar
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks/use.store";
import { SideRightProfileNavbar } from "../../features/base/component/nav/right-profile-nav";

export function Base() {
    const user = useAppSelector((state) => state.auth);
    const location = useLocation();

    if (!Object.keys(user).length) return <Navigate to={"/login"} />;
    if (!user.id) return <Navigate to={"/login"} />;

    const isProfilePage = location.pathname.includes('/profile');

    return (
        <Box display={'flex'} width={'100%'} height={'100vh'} bg={'#1D1D1D'} overflowY={'auto'}>
            <Box flex={1}>
                <SideLeftNavbar />
            </Box>
            <Box flex={2} overflowY={'auto'} borderRight={'1px solid #545454'} borderLeft={'1px solid #545454'}>
                <Outlet />
            </Box>
            <Box flex={1.5} overflowY={'auto'}>
                {isProfilePage ? <SideRightProfileNavbar /> : <SideRightNavbar />}
            </Box>
        </Box>
    );
}
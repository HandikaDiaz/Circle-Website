import { useAppSelector } from "../store/hooks/use.store";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoutes() {
    const user = useAppSelector((state) => state.auth);

    if (!Object.keys(user).length) return null;

    if (!user.id) return <Navigate to={"/login"} />;

    return <Outlet />;
}
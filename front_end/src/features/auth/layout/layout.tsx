import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks/use.store";

export function AuthLayout() {
    const user = useAppSelector((state) => state.auth);

    if (user.id) return <Navigate to={"/"} />;

    return <Outlet />;
}
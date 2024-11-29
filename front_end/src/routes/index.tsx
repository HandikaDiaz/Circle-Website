import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeLayout } from "../features/base/layout/home-layout";
import { ProfileLayout } from "../features/base/layout/profile-layout";
import { ProfilePeopleLayout } from "../features/base/layout/profile-people-layout";
import { SearchLayout } from "../features/base/layout/search-layout";
import { StatusLayout } from "../features/base/layout/status-layout";
import { ForgotRoute } from "./auth/forgot";
import { LoginRoute } from "./auth/login";
import { RegisterRoute } from "./auth/register";
import { ResetRoute } from "./auth/reset";
import { Base } from "./base/base";
import { AuthLayout } from "../features/auth/layout/layout";
import { FollowLayout } from "../features/base/layout/follow-layout";
import { Admin } from "./admin/admin";
import { AdminPost } from "../features/admin/components/adminpost";

export function AppRouter() {
    const router = createBrowserRouter([
        {
            element: <AuthLayout />,
            children: [
                {
                    path: "/login",
                    element: <LoginRoute />,
                },
                {
                    path: "/register",
                    element: <RegisterRoute />,
                },
                {
                    path: "/reset/:token",
                    element: <ResetRoute />,
                },
                {
                    path: "/forgot",
                    element: <ForgotRoute />,
                },
            ]
        },
        {
            path: "admin",
            element: <Admin />,
            children: [
                {
                    index: true,
                    element: <AdminPost />,
                },
            ]
        },
        {
            path: "/",
            element: <Base />,
            children: [
                {
                    index: true,
                    element: <HomeLayout />,
                },
                {
                    path: "status/:postId",
                    element: <StatusLayout />,
                },
                {
                    path: "profile",
                    element: <ProfileLayout />,
                },
                {
                    path: "profile-people/:userId",
                    element: <ProfilePeopleLayout />,
                },
                {
                    path: "search",
                    element: <SearchLayout />,
                },
                {
                    path: "follow",
                    element: <FollowLayout />,
                },
            ]
        },
    ]);

    return <RouterProvider router={router} />;
}
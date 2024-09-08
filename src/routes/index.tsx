import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DetailLayout } from "../features/base/layout/detail-layout";
import { ProfileLayout } from "../features/base/layout/profile-layout";
import { ProfilePeopleLayout } from "../features/base/layout/profile-people-layout";
import { SearchLayout } from "../features/base/layout/search-layout";
import { StatusLayout } from "../features/base/layout/status-layout";
import { ForgotRoute } from "./auth/forgot";
import { LoginRoute } from "./auth/login";
import { RegisterRoute } from "./auth/register";
import { ResetRoute } from "./auth/reset";
import { Base } from "./base/base";
import { HomeLayout } from "../features/base/layout/home-layout";

export function AppRouter() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Base />,
            children: [
                {
                    index: true,
                    element: <HomeLayout />,
                },
                {
                    path: "status",
                    element: <StatusLayout />,
                },
                {
                    path: "profile",
                    element: <ProfileLayout />,
                },
                {
                    path: "profile-people",
                    element: <ProfilePeopleLayout />,
                },
                {
                    path: "search",
                    element: <SearchLayout />,
                },
                
            ]
        },
        {
            path: "/login",
            element: <LoginRoute />,
        },
        {
            path: "/register",
            element: <RegisterRoute />,
        },
        {
            path: "/reset",
            element: <ResetRoute />,
        },
        {
            path: "/forgot",
            element: <ForgotRoute />,
        },
    ]);

    return <RouterProvider router={router} />;
}
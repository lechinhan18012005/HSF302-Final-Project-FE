import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        lazy: () => import("@/features/landing/components/LandingPage"),
    },
    {
        path: "/login",
        lazy: () => import("@/features/auth/components/LoginPage"),
    },
    {
        path: "/register",
        lazy: () => import("@/features/auth/components/RegisterPage"),
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                lazy: () => import("@/features/dashboard/components/DashboardPage"),
            },
            {
                path: "users",
                lazy: () => import("@/features/user/components/UserListPage"),
            },
            {
                path: "companies",
                lazy: () => import("@/features/company/components/CompanyListPage"),
            },
            {
                path: "roles",
                lazy: () => import("@/features/role/components/RoleListPage"),
            },
            {
                path: "permissions",
                lazy: () =>
                    import("@/features/permission/components/PermissionListPage"),
            },
        ],
    },
]);


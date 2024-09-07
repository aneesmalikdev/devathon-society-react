import { FC, lazy, ReactElement } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import DefaultComponent from "../components/default";
import DefaultLayout from "../components/layout";
import { LoginPage } from "../components/login";
import Register from "../components/register/page/RegisterPage";
import { useAuth } from "../context/authContext";
import DashboardPage from "../components/dashboard/page/DashboardPage";
import ResidentsPage from "../components/residents/page/ResidentsPage";
import BillsPage from "../components/bills/page/BillsPage";
import VerifyEmailPage from "../components/verify-email/VerifyEmail";

const NotFound = lazy(
  () => import("../components/not-found/page/NotFoundPage")
);

type NavType = {
  path: string;
  label?: string;
  element?: ReactElement;
  private?: boolean;
  withLayout?: boolean;
};

const navs: NavType[] = [
  {
    path: "/login",
    label: "login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    label: "register",
    element: <Register />,
  },
  {
    path: "/verify-email",
    label: "verify-email",
    element: <VerifyEmailPage />,
  },
  {
    path: "/dashboard",
    label: "dashboard",
    element: <DashboardPage />,
    private: true,
    withLayout: true,
  },
  {
    path: "/residents",
    label: "residents",
    element: <ResidentsPage />,
    private: true,
    withLayout: true,
  },
  {
    path: "/bills",
    label: "bills",
    element: <BillsPage />,
    private: true,
    withLayout: true,
  },
];

const Routes: FC = () => {
  const auth = useAuth();
  const routes = [
    {
      path: "/",
      element: <DefaultComponent />,
      children: [
        { path: "", element: <Navigate to="dashboard" /> },
        ...navs.map((nav) => ({
          ...nav,
          element:
            nav.private && !auth?.currentUser ? ( // Protect private routes
              <Navigate to="/login" replace /> // Redirect to login if not authenticated
            ) : nav.withLayout ? (
              <DefaultLayout>{nav.element}</DefaultLayout>
            ) : (
              nav.element
            ),
        })),

        { path: "*", element: <NotFound /> },
      ],
    },
  ];

  const element = useRoutes(routes);

  return element;
};

export default Routes;

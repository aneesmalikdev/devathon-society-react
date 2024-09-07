import { FC, lazy, ReactElement } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import DefaultComponent from "../components/default";
import DefaultLayout from "../components/layout";
import { LoginPage } from "../components/login";
import Register from "../components/register/page/RegisterPage";
import { useAuth } from "../context/authContext";

const NotFound = lazy(
  () => import("../components/not-found/page/NotFoundPage")
);

type NavType = {
  path: string;
  label?: string;
  element?: ReactElement;
  private?: boolean;
};

const navs: NavType[] = [
  {
    path: "/home",
    label: "home",
    element: <h1>Home</h1>,
  },
  {
    path: "/login",
    label: "login",
    element: <LoginPage />,
    private: true,
  },
  {
    path: "/register",
    label: "register",
    element: <Register />,
    private: true,
  },
  {
    path: "/dashboard",
    label: "dashboard",
    element: (
      <DefaultLayout>
        <h1>Dashboard</h1>
      </DefaultLayout>
    ),
  },
];

const Routes: FC = () => {
  const auth = useAuth()
  const routes = [
    {
      path: "/",
      element: <DefaultComponent />,
      children: [
        { path: "", element: <Navigate to="home" /> },
        ...navs,
        ...navs.map((nav) => ({
          ...nav,
          element:
            nav.private && !auth?.currentUser ? ( // Protect private routes
              <Navigate to="/login" replace /> // Redirect to login if not authenticated
            ) : (
              <DefaultLayout>{nav.element}</DefaultLayout>
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

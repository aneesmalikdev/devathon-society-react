import { FC, lazy, ReactElement } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import DefaultComponent from "../components/default";
import DefaultLayout from "../components/layout";
import { LoginPage } from "../components/login";

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
            // nav.private && !isAuthenticated ? ( // Protect private routes
            nav.private && false ? ( // Protect private routes
              <Navigate to="/home" replace /> // Redirect to login if not authenticated
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

import { FC, lazy, ReactElement, Suspense } from "react";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import { LoginPage } from "../components/login";
import DefaultComponent from "../components/default";

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
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    label: "dashboard",
    element: <h1>Dashboard</h1>,
    private: true,
  },
];

const Routes: FC = () => {
  const routes = [
    {
      path: "/",
      element: <DefaultComponent />,
      children: [
        { path: "", element: <Navigate to="home" /> },
        ...navs.map((nav) => ({
          ...nav,
          element:
            nav.private && !isAuthenticated ? ( // Protect private routes
              <Navigate to="/home" replace /> // Redirect to login if not authenticated
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

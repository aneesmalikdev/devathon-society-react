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
};

const navs: NavType[] = [
  {
    path: "/home",
    label: "home",
    element: <LoginPage />,
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
        { path: "*", element: <NotFound /> },
      ],
    },
  ];

  const element = useRoutes(routes);

  return element;
};

export default Routes;

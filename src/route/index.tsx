import React from "react";

import { useRoutes, BrowserRouter as Router, Navigate } from "react-router-dom";

import { Basic } from "@/layout/Basic";

import My from "@/page/My";

import { CustomRouteObject, useRoute } from "./useRoute";

const routerConfig: CustomRouteObject[] = [
  {
    path: "",
    element: <Navigate to={"/basic/my"} replace></Navigate>,
  },
  {
    path: "basic",
    element: <Basic></Basic>,
    children: [
      {
        path: "my",
        element: <My></My>,
      },
    ],
  },
];

export const Route: React.FC = () => {
  const routeList = useRoute(routerConfig);

  const Routes: React.FC = () => {
    return useRoutes(routeList);
  };

  return (
    <Router>
      <Routes />
    </Router>
  );
};

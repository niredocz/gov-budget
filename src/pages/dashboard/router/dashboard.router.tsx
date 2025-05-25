import { RouteObject } from "react-router";

import { DashboardViews } from "../views/dashboard.views";

export const dashboardRouter: RouteObject[] = [
  {
    path: "/",
    element: <DashboardViews />,
  },
];

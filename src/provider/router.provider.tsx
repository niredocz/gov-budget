import { createBrowserRouter } from "react-router";

import { dashboardRouter } from "@/pages/dashboard/router/dashboard.router";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [...dashboardRouter],
  },
]);

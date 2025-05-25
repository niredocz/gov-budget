import React from "react";
import { RouterProvider } from "react-router";

/* Providers */
import { router } from "@/provider/router.provider";
import { ThemeProvider } from "@/provider/theme.provider";

function App() {
  return (
    <React.Fragment>
          <ThemeProvider defaultTheme="system">
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.Fragment>
  );
}

export default App;

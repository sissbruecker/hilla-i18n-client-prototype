import MainLayout from "Frontend/views/MainLayout.js";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { AboutView } from "Frontend/views/AboutView";
import { FormView } from "Frontend/views/FormView";
import { HomeView } from "Frontend/views/HomeView";

export const routes = [
  {
    element: <MainLayout />,
    handle: { name: "default" },
    children: [
      {
        path: "/",
        element: <HomeView />,
        handle: { name: "home" },
      },
      {
        path: "/about",
        element: <AboutView />,
        handle: { name: "about" },
      },
      {
        path: "/form",
        element: <FormView />,
        handle: { name: "form" },
      },
    ],
  },
] as RouteObject[];

export default createBrowserRouter(routes);

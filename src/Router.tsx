import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Tv from "./pages/Tv";
import Search from "./pages/Search";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "tv",
        element: <Tv />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
]);

export default router;

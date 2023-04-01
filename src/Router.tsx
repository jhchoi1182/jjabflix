import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Tv from "./pages/Tv";
import Search from "./pages/Search";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Bookmark from "./pages/Bookmark";

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
        path: "movie",
        element: <Movie />,
      },
      {
        path: "bookmark",
        element: <Bookmark />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
]);

export default router;

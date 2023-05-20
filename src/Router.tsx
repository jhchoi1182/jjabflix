import { createBrowserRouter } from "react-router-dom";
import SearchResult from "./components/pages/SearchResult";
import Bookmark from "./components/pages/Bookmark";
import Movie from "./components/pages/Movie";
import Home from "./components/pages/Home";
import Root from "./Root";
import Tv from "./components/pages/Tv";

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
        path: "/:pathnameId",
        element: <Home />,
      },
      {
        path: "tv",
        element: <Tv />,
      },
      {
        path: "/tv/:pathnameId",
        element: <Tv />,
      },
      {
        path: "movie",
        element: <Movie />,
      },
      {
        path: "/movie/:pathnameId",
        element: <Movie />,
      },
      {
        path: "bookmark",
        element: <Bookmark />,
      },
      {
        path: "/bookmark/:pathnameId",
        element: <Bookmark />,
      },
      {
        path: "search",
        element: <SearchResult />,
      },
      {
        path: "/search/:pathnameId",
        element: <SearchResult />,
      },
    ],
  },
]);

export default router;

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
        path: "/:dataId",
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
        element: <SearchResult />,
      },
    ],
  },
]);

export default router;

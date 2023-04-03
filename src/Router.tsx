import { createBrowserRouter } from "react-router-dom";
import SearchResult from "./Pages/SearchResult";
import Bookmark from "./Pages/Bookmark";
import Movie from "./Pages/Movie";
import Home from "./Pages/Home";
import Root from "./Root";
import Tv from "./Pages/Tv";

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

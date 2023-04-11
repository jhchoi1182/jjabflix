import { createBrowserRouter } from "react-router-dom";
import SearchResult from "./Components/Pages/SearchResult";
import Bookmark from "./Components/Pages/Bookmark";
import Movie from "./Components/Pages/Movie";
import Home from "./Components/Pages/Home";
import Root from "./Root";
import Tv from "./Components/Pages/Tv";

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

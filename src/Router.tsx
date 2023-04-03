import { createBrowserRouter } from "react-router-dom";
import Bookmark from "./Pages/Bookmark";
import Search from "./Pages/Search";
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
        element: <Search />,
      },
    ],
  },
]);

export default router;

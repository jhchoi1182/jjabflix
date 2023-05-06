import React from "react";
import { Outlet, useParams } from "react-router-dom";
import Header from "./components/organisms/Header/Header";

const App = () => {
  const { dataId } = useParams();

  return (
    <div>
      <Header />
      <Outlet context={{ pathnameId: dataId }} />
    </div>
  );
};

export default App;

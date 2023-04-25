import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/organisms/Header/Header";

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;

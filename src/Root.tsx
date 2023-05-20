import { Outlet } from "react-router-dom";
import Header from "./components/organisms/Header/Header";
import Footer from "./components/organisms/Footer/Footer";

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;

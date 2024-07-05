import { Outlet, Link } from "react-router-dom";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default Layout;

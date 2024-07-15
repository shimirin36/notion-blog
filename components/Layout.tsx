import React from "react";
import Navbar from "./Navbar/Navbar";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const Layout = ({ children }: any) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;

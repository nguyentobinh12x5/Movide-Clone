import React from "react";
import Nav from "../components/browse/Nav";
import { Outlet } from "react-router-dom";
function RootLayout() {
  return (
    <div>
      <Nav></Nav>
      <Outlet />
    </div>
  );
}

export default RootLayout;

import React from "react";
import Login from "../pages/Login";
function Private({ Component }) {
  if (localStorage.getItem("user")) {
    return <Component />;
  }
  return <Login />;
}

export default Private;

import React from "react";
import Login from "../pages/Login";
function Admin({ Component }) {
  
  if (localStorage.getItem('user')) {
    return <Component />;
  }
  return <Login/>;
}

export default Admin;

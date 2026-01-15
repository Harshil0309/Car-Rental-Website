import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

function AdminProtected({ Component }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Check if user is admin
  if (!user) {
    return (
      <Result
        status="403"
        title="Unauthorized"
        subTitle="Please log in to access this page."
        extra={
          <Link to="/login">
            <Button type="primary">Go to Login</Button>
          </Link>
        }
      />
    );
  }

  if (!user.isAdmin && user.role !== 'admin') {
    return (
      <Result
        status="403"
        title="Access Denied"
        subTitle="You don't have permission to access the admin panel. Only administrators can access this area."
        extra={
          <Link to="/">
            <Button type="primary">Back to Home</Button>
          </Link>
        }
      />
    );
  }

  // User is admin, render the component
  return <Component />;
}

export default AdminProtected;

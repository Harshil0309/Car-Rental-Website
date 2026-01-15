import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

function SuperAdminProtected({ Component }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Check if user is super admin
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

  if (!user.isSuperAdmin && user.role !== "superadmin") {
    return (
      <Result
        status="403"
        title="Access Denied"
        subTitle="You don't have permission to access the super admin panel. Only super administrators can access this area."
        extra={
          <Link to="/">
            <Button type="primary">Back to Home</Button>
          </Link>
        }
      />
    );
  }

  // User is super admin, render the component
  return <Component />;
}

export default SuperAdminProtected;

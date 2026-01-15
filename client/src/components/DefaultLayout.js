import React, { useState } from "react";
import { Menu, Dropdown, Button, Space, Row, Col } from "antd";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  BookOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.isAdmin || user?.role === "admin";
  const isSuperAdmin = user?.isSuperAdmin || user?.role === "superadmin";

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/" style={{ color: "inherit" }}>
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<BookOutlined />}>
        <Link to="/userbookings" style={{ color: "inherit" }}>
          My Bookings
        </Link>
      </Menu.Item>

      {isAdmin && (
        <>
          <Menu.Divider />
          <Menu.ItemGroup
            title="Admin"
            style={{ color: "#667eea", fontWeight: "600" }}
          >
            <Menu.Item key="3" icon={<DashboardOutlined />}>
              <Link to="/admin" style={{ color: "inherit" }}>
                Admin Panel
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </>
      )}

      {isSuperAdmin && (
        <>
          <Menu.Divider />
          <Menu.ItemGroup
            title="Super Admin"
            style={{ color: "#ff7043", fontWeight: "600" }}
          >
            <Menu.Item key="5" icon={<UsergroupAddOutlined />}>
              <Link to="/superadmin" style={{ color: "inherit" }}>
                User Management
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </>
      )}

      <Menu.Divider />
      <Menu.Item
        key="4"
        icon={<LogoutOutlined />}
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
      >
        <span style={{ color: "#d32f2f" }}>Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className="header bs1">
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between align-items-center">
              <h1 style={{ margin: 0 }}>
                <b>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    🚗 Rent-A-Car{" "}
                    {isSuperAdmin && (
                      <span style={{ fontSize: "0.6em", marginLeft: "8px" }}>
                        👑 Super Admin
                      </span>
                    )}
                    {isAdmin && !isSuperAdmin && (
                      <span style={{ fontSize: "0.6em", marginLeft: "8px" }}>
                        👑 Admin
                      </span>
                    )}
                  </Link>
                </b>
              </h1>

              <Dropdown
                overlay={menu}
                placement="bottomRight"
                trigger={["click"]}
              >
                <Button
                  type="primary"
                  shape="round"
                  icon={<UserOutlined />}
                  style={{
                    background: isSuperAdmin
                      ? "linear-gradient(135deg, #ff7043 0%, #ff5722 100%)"
                      : isAdmin
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      : "linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)",
                    border: "none",
                  }}
                >
                  {user?.username || "User"} {(isSuperAdmin || isAdmin) && "👑"}
                </Button>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>

      <div className="footer">
        <hr />
        <p
          style={{ fontSize: "1rem", fontWeight: "500", marginBottom: "10px" }}
        >
          Designed & Developed By
        </p>
        <p style={{ fontSize: "0.95rem", opacity: 0.8 }}>Harshil Gupta</p>
        <p style={{ fontSize: "0.85rem", opacity: 0.6, marginTop: "15px" }}>
          © 2025 Rent-A-Car. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default DefaultLayout;
